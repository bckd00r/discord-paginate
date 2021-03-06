Discord Paginate: Regardless of Eris or Discord.JS, simply paginate your content!
======
<p>A module that will make your job easier while creating paged content</p>
<p>Easily paginate your content, regardless of whether you use Eris or Discord.JS</p>

<b>[Discord: https://discord.com/invite/BjEJFwh](https://discord.com/invite/BjEJFwh)</b>
-------

<b>Please Note: <b>
-------
<p>System currently only supports Eris and DiscordJS. If you are using another module, you can tell us about it or you can contribute by adapting it to the module you use yourself. We are open to all kinds of help :)</p>

<b>[NPM Page](https://www.npmjs.com/package/discord-paginate) [GITHUB Page](https://github.com/barbarbar338/discord-paginate)</b>
-------

Usage
------------
<p>For Eris: </p>

```js

/* Eris packages */
const Eris = require("eris");
const bot = new Eris("BOT_TOKEN");

/* Discord Paginate packages */
const { PaginateContent } = require("discord-paginate");

/* Emitted when bot is ready */
bot.on("ready", () => {
    console.log("Ready!");
});

/* Emitted when someone sends message */
bot.on("messageCreate", async (message) => {

    /* Setting up pages */
    let pages = [
        "this is first page content",
        "this is second page content",
        { embed: { description: "You can also use embeds" } },
        "this is another page"
    ];

    /* Create paginated content */
    let paginated = new PaginateContent.Eris(bot, message, pages);

    /* Initialize paginated content */
    await paginated.init();
});

/* Connect to Discord API */
bot.connect();

```

<p>For Discord.JS: </p>

```js
/* DiscordJS packages */
const { Client } = require("discord.js");
const client = new Client();

/* Discord Paginate packages */
const { PaginateContent } = require("discord-paginate");

/* Emitted when bot is ready */
client.on("ready", () => {
    console.log("Ready!");
});

/* Emitted when someone sends message */
client.on("message", async (message) => {

    /* Setting up pages */
    let pages = [
        "this is first page content",
        "this is second page content",
        { embed: { description: "You can also use embeds" } },
        "this is another page"
    ];

    /* Create paginated content */
    let paginated = new PaginateContent.DiscordJS(client, message, pages);

    /* Initialize paginated content */
    await paginated.init();
});

/* Connect to Discord API */
client.login("BOT_TOKEN");
```

[Contact Me For More Help](https://www.is-my.fun/ulas)
-------------------

\ ゜o゜)ノ
