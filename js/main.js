window.addEventListener('load', () => {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // Preferences
            if (config.preferences.show_message) {
                const messageText = document.getElementById('message-text');
                messageText.innerText = "Welcome, ";
                if (config.preferences.typewriter_animation) {
                    const nameElement = document.createElement('span');
                    nameElement.id = 'name';
                    messageText.appendChild(nameElement);
                    typewriter(config.user.name, 'name');
                } else {
                    messageText.innerText += config.user.name;
                }
            } else {
                document.getElementById('message').style.display = 'none';
            }

            if (config.preferences.show_date) {
                document.getElementById('date-text').innerText = new Date().toDateString();
            } else {
                document.getElementById('date').style.display = 'none';
            }

            // Websites
            renderWebsites(config.websites);
        });
});

function typewriter(text, elementId) {
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById(elementId).innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 150);
        }
    }
    type();
}

function renderWebsites(websites) {
    const websitesContainer = document.getElementById('websites');
    websites.forEach(website => {
        const link = document.createElement('a');
        link.href = website.url;
        link.textContent = website.name;
        websitesContainer.appendChild(link);
    });
}