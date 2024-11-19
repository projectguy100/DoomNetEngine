let searchData = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('search.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
        })
        .catch(error => console.error('Error loading search data:', error));

    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var query = document.getElementById('search-input').value.toLowerCase();
        saveSearchQuery(query);
        searchSites(query);
    });
});

function saveSearchQuery(query) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(query)) {
        searchHistory.unshift(query);
        if (searchHistory.length > 10) {
            searchHistory.pop();
        }
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

function searchSites(query) {
    var results = searchData.filter(site => 
        site.title.toLowerCase().includes(query) || 
        site.content.toLowerCase().includes(query)
    );
    displayResults(results);
}

function displayResults(results) {
    var resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';
    if (results.length === 0) {
        resultsDiv.innerHTML = 'No results found.';
    } else {
        var ul = document.createElement('ul');
        results.forEach(function(result) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = result.url;
            a.textContent = result.title;
            li.appendChild(a);
            ul.appendChild(li);
        });
        resultsDiv.appendChild(ul);
    }
}