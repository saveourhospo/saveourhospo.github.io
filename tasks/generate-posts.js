const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dayjs = require('dayjs');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../saveourhospo-credentials.json');

const postsPath = path.join(__dirname, '..', '_posts');
const googlSheetId = '1BtTaOv_q6REnW_Zn1d_2WUyNi-tR1UninRLIY3M6TfM';

function getFileName(item, djDate) {
    let nameParts = [
        djDate.format('YYYY-MM-DD'),
        djDate.unix(),
        item.Name.split(' ').map(n => n.toLowerCase()).join('-'),
    ];

    return `${nameParts.join('-')}.md`;
}

function getFileData(item, djDate) {
    let data = [
        '---',
        `date: "${djDate.format('YYYY-MM-DD HH:mm:ss')}"`,
        `title: "${item['Name']}"`,
        `address: "${item['Address']}"`,
        `city: "${item['City']}"`,
        `voucher_link: "${item['Voucher / Donation URL']}"`,
        `delivery_link: "${item['Online Delivery URL']}"`,
        `image: "${item['Cover Image URL']}"`,
        '---'
    ];
    return data.join('\n');
}

function createPosts(rows) {
    rows.forEach(function(item) {
        let djDate = dayjs(item.Timestamp);
        let fileData = getFileData(item, djDate);
        let fileName = getFileName(item, djDate);
        let filePath = path.join(postsPath, fileName);

        fs.writeFile(filePath, fileData, {flag:'w'}, (err) => {
            if (err)  {
                console.log(chalk.red(`${fileName}`));
                throw err;
            }
            console.log(chalk.green(`${fileName}`));
        });
    });
}

async function loadSheetRows() {
    const doc = new GoogleSpreadsheet(googlSheetId);

    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    return await sheet.getRows();
}

async function runTask() {
    const rows = await loadSheetRows();
    createPosts(rows);
}

runTask();