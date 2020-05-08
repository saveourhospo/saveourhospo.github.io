SaveOurHospo
===========

This is a project to help out our favourite restaurants, cafés and other venues, in these devastating times of the COVID-19 Virus.

# Helping Out

## Adding a venue
You can add your own venue by creating a pull request and adding a new jekyll post (new markup file under `_posts`) with the following data:

### Filename
```
YEAR-MONTH-DAY-UNIX_TIMESTAMP-venue-name-in-lowercase.md
```
Example: `2020-03-29-1586860317-my-cafe.md`

### Content
```
---
date:  "YYYY-MM-DD HH:mm:ss"
title:  "NAME"
address: "ADDRESS"
city: "CITY"
voucher_link: "VOUCHER_LINK"
delivery_link: "DELIVERY_LINK_OPTIONAL"
image: "IMAGE_URL_OPTIONAL"
---
```

- **date:** Date and time for sorting purposes
- **title:** Name of the venue
- **address:** Venue address
- **city:** Venue city
- **voucher_link:** Link to voucher or donation page
- **delivery_link:** Link to delivery service (optional)
- **image:** Cover image URL (optional) - Don't use copyright protected images without premission

# Fork this project
You are more than welcome to fork this project and help out venues in your city or region.

## Development
This is a [Jekyll](https://jekyllrb.com/docs/) powered page, hosted on [GitHub Pages](https://pages.github.com/).

### Setup
1. Install [Jekyll](https://jekyllrb.com/docs/)
2. Fork this repository and clone it to your machine
3. Install dependencies
```sh
bundle install
```
4. Run the Jekyll server under http://localhost:4000/
```sh
bundle exec jekyll serve
```

### Customization
You can customize every setting in the `_config.yml` file to fit your needs.
