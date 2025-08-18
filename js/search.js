const searchBar = document.getElementById('search-bar-input');

searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = searchBar.value;
        if (query) {
            const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(query);
            window.location.href = searchURL;
        }
    }
});