# Startpage

A simple, clean, and customizable start page for your browser.

## Configuration

To personalize your start page, you can modify the `config.json` file.

### User

To change the name that appears on the start page, simply modify the `name` value within the `user` object:

```json
"user": {
    "name": "Your Name"
}
```

### Preferences

You can customize the look and feel of your start page by adjusting the values in the `preferences` object:

*   `show_date`: Set to `true` to display the current date, or `false` to hide it.
*   `show_message`: Set to `true` to display the welcome message, or `false` to hide it.
*   `typewriter_animation`: Set to `true` to enable the typewriter animation for the welcome message, or `false` to disable it.

```json
"preferences": {
    "show_date": true,
    "show_message": true,
    "typewriter_animation": true
}
```

### Websites

You can add, remove, or modify the websites that appear on your start page by editing the `websites` array. Each website is an object with a `name` and a `url`.

```json
"websites": [
    {
        "name": "GitHub",
        "url": "https://github.com/"
    },
    {
        "name": "YT Music",
        "url": "https://music.youtube.com"
    },
    {
        "name": "Youtube",
        "url": "https://www.youtube.com/"
    },
    {
        "name": "Reddit",
        "url": "https://www.reddit.com/"
    }
]
```

## License

This project is licensed under the [MIT License](LICENSE).
