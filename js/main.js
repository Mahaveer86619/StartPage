window.addEventListener('load', () => {
    // Check if the message element exists
    const messageElement = document.getElementById('message');
    if (messageElement) {
        // Set the message text
        document.getElementById('message-text').innerText = config.message;
    }

    // Set the date text
    document.getElementById('date-text').innerText = new Date().toDateString();

    // Render the websites
    renderWebsites();

    // Render other content
    renderOtherContent();
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        document.getElementById('search-bar-input').focus();
    }
});

debug = false; // Enable while testing on local
searchBarDivId = "search-bar"
searchBarId = "search-bar-input"
messageDivId = "message"
dateDivId = "date"
dateId = "date-text"
messageId = "message-text"
timeZ = undefined
websitesId = "websites"
disable24Hour = false;
apiUrl = "https://dummy.rest/weather"

function initBody() {
    console.log("initBody called");
    readJSON("config.json");
}

function initSearchBar(jsonData) {
    document.getElementById(searchBarId).value = ""
    document.getElementById(searchBarId).focus()
    searchEngine = "Google"
    searchUrl = "https://www.google.com/search?q="
    document.getElementById(searchBarId).placeholder = `Search something on ${searchEngine}`
    document.getElementById(searchBarId).addEventListener("keypress", (event) => {
        if (event.key != 'Enter') return

        query = document.getElementById(searchBarId).value

        if (query == "--setting" || query == "--settings") {
            showSettings()
            document.getElementById(searchBarId).value = ""
            return
        }

        query = query.replace(/\ /g, "+")
        document.location = searchUrl + query
    })
}

function buildMsg() {
    date = new Date()
    currentHour = date.getHours()
    currentMinute = date.getMinutes()
    currentTime = currentHour + (0.01 * currentMinute)

    if (inRange(currentTime, 0, 5.59))
        return "It's too late, take some sleep"
    if (inRange(currentTime, 6, 8.59))
        return "You're up early"
    if (inRange(currentTime, 9, 11.59))
        return "Have a good day ahead"
    if (inRange(currentTime, 12, 16.59))
        return "Good Afternoon"
    if (inRange(currentTime, 17, 19.59))
        return "Good Evening"
    if (inRange(currentTime, 20, 24))
        return "It's time to wrap up for the day"
    else
        return ""
}

function handleMessage(greeting) {
    console.log("handleMessage called with greeting:", greeting);
    var builtMsg = buildMsg()
    if (greeting.typewriter) {
        document.getElementById(messageId).innerHTML = builtMsg + ", "
        typewriter(greeting.name, messageId)
    } else {
        document.getElementById(messageId).textContent = builtMsg + ", " + greeting.name
    }
}

function typewriter(text, elementId) {
    console.log(`typewriter called with text: ${text} and elementId: ${elementId}`);
    let i = 0;
    function type() {
        if (i < text.length) {
            document.getElementById(elementId).innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();
}

function updateTime() {
    currentDate = new Date()
    options = {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: disable24Hour,
    }
    try {
    finalDate = currentDate.toLocaleString(undefined, options)
    } catch (error) {
        options.timeZone = timeZ
    }
    finalDate = currentDate.toLocaleString(undefined, options)
    document.getElementById(dateId).textContent = finalDate
}

function updateTimeHook() {
    updateTime()
    interval = setInterval(() => {
        updateTime()
    }, 30 * 1000)
}

function readJSON(fileName) {
    console.log("readJSON called");
    fetch(fileName)
        .then(response => {return response.json()})
        .then(jsonData => {
            console.log("jsonData:", jsonData);
            parseAndCreate(jsonData)
        })
}

function parseAndCreate(jsonData) {
    console.log("parseAndCreate called with jsonData:", jsonData);
    if (jsonData["title"]) document.title = jsonData["title"]

    handleMessage(jsonData["greeting"])

    disable24Hour = jsonData["disable24Hour"]
    timeZ = jsonData["timeZone"]
    timeZ = isValidTimeZone(timeZ) ? timeZ : undefined
    if (jsonData["disableMessage"])
        document.getElementById(messageDivId).style.display = "none"
    if (jsonData["disableDate"]) {
        document.getElementById(dateId).style.display = "none"
        document.getElementById(lineId).style.display = "none"
    }
    else
        updateTimeHook()

    if (jsonData["disableSearchBar"])
        document.getElementById(searchBarDivId).style.display = "none"
    else
        initSearchBar(jsonData)

    websites = jsonData["websites"]
    createWebsiteList(websites)
    
}

function createWebsiteList(websites) {
    websites.forEach(element => {
        a = document.createElement("a")
        attrHref = document.createAttribute("href")
        attrHref.value = element["url"]
        a.setAttributeNode(attrHref)
        a.textContent = element["name"]
        document.getElementById(websitesId).appendChild(a)
    })
}

function isValidTimeZone(tz) {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
        throw 'Time zones are not available in this environment';
    }

    try {
        Intl.DateTimeFormat(undefined, {timeZone: tz});
        return true;
    }
    catch (ex) {
        return false;
    }
}

function getFahrenheit(inCelcius) {
    return Math.floor((inCelcius * 9 / 5) + 32)
}

function indexUppercase(unformatted) {
    return unformatted.split(" ").map(w => {
        return w[0].toUpperCase() + w.substring(1)
    }).join(" ")
}

function inRange(number, min, max) {
    return (number >= min && number <= max)
}



function showSettings() {
    document.getElementById("settings").style.display = "block"
}

function hideSettings() {
    document.getElementById("settings").style.display = "none"
}

document.getElementById("settings-cog").addEventListener("click", showSettings)
document.getElementsByClassName("close")[0].addEventListener("click", hideSettings)
window.addEventListener("click", (event) => {
    if (event.target == document.getElementById("settings")) {
        hideSettings()
    }
})
