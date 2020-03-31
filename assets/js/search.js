---
---
var inputWrapper = document.getElementById('search');
var searchInput = document.getElementById('search-input');
var postContainer = document.getElementById('post-container');
var resultContainer = document.getElementById('post-result-container');
var postPager = document.getElementById('post-pager');
var searchValue = '';

var sjs = SimpleJekyllSearch({
    success: function() {},
    searchInput: document.createElement('INPUT'),
    resultsContainer: resultContainer,
    searchResultTemplate: '{html}',
    noResultsText: '<div class="post-search-no-result"><h3>{{ site.translations.no_result }}</h3></div>',
    json: '/data.json',
    limit: 6
});

function runSearch(event) {
    // ENTER
    if (event.keyCode === 13) {
        searchInput.blur();
    }

    // ESC
    if (event.keyCode === 27) {
        searchInput.value = '';
        searchInput.blur();
    }
    
    if (searchValue === event.target.value) {
        return false;
    } else {
        searchValue = event.target.value;
    }
    
    var cond = !!searchValue;
    postPager.classList.toggle('hidden', cond);
    postContainer.classList.toggle('hidden', cond);
    resultContainer.classList.toggle('hidden', !cond);

    sjs.search(searchValue);
    return false;
}

searchInput.addEventListener('keyup', runSearch);
searchInput.addEventListener('search', runSearch);
searchInput.addEventListener('focus', function() {
    inputWrapper.classList.add('focused');
});
searchInput.addEventListener('blur', function() {
    inputWrapper.classList.remove('focused');
});