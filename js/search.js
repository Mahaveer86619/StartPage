const searchBar = document.getElementById('search-bar-input');

window.addEventListener('keydown', (event) => {
    // If the user is typing in an input field, do nothing
    if (event.target.tagName.toLowerCase() === 'input') {
        return;
    }

    // If the pressed key is a character, focus the search bar
    if (event.key.length === 1) {
        searchBar.focus();
    }
});

searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = searchBar.value;
        if (query) {
            const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(query);
            window.location.href = searchURL;
        }
    }
});