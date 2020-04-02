---
---
var inputWrapper = document.getElementById('search');
var searchInput = document.getElementById('search-input');
var postContainer = document.getElementById('post-container');
var resultContainer = document.getElementById('post-result-container');
var postPager = document.getElementById('post-pager');
var searchQuery = '';

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var sjs = SimpleJekyllSearch({
    success: function() {},
    searchInput: document.createElement('INPUT'),
    resultsContainer: resultContainer,
    searchResultTemplate: '{html}',
    noResultsText: '<div class="post-search-no-result"><h3>{{ site.translations.no_result }}</h3></div>',
    json: '/data.json',
    limit: 6
});

var sendSearchData = debounce(function(q) {
    gtag('event', 'search', { search_term: q });
}, 500);

function runSearch (event) {
    // ENTER
    if (event.keyCode === 13) {
        searchInput.blur();
    }

    // ESC
    if (event.keyCode === 27) {
        searchInput.value = '';
        searchInput.blur();
    }
    
    if (searchQuery === event.target.value) {
        return false;
    } else {
        searchQuery = event.target.value;
    }
    
    var cond = !!searchQuery;
    postPager.classList.toggle('hidden', cond);
    postContainer.classList.toggle('hidden', cond);
    resultContainer.classList.toggle('hidden', !cond);

    sjs.search(searchQuery);
    sendSearchData(searchQuery);
    return false;
};

searchInput.addEventListener('keyup', runSearch);
searchInput.addEventListener('search', runSearch);
searchInput.addEventListener('focus', function() {
    inputWrapper.classList.add('focused');
});
searchInput.addEventListener('blur', function() {
    inputWrapper.classList.remove('focused');
});