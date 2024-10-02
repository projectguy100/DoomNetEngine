document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var query = document.getElementById('search-input').value.toLowerCase();
        searchSites(query);
    });

    function searchSites(query) {
        fetch('search.json')
            .then(response => response.json())
            .then(data => {
                var results = data.filter(site => 
                    site.title.toLowerCase().includes(query) || 
                    site.content.toLowerCase().includes(query)
                );
                displayResults(results);
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('search-results').innerHTML = 'An error occurred while searching.';
            });
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
