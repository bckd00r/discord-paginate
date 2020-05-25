/* 
  ______ ____  _____    ______ _____  _____  _____ 
 |  ____/ __ \|  __ \  |  ____|  __ \|_   _|/ ____|
 | |__ | |  | | |__) | | |__  | |__) | | | | (___  
 |  __|| |  | |  _  /  |  __| |  _  /  | |  \___ \ 
 | |   | |__| | | \ \  | |____| | \ \ _| |_ ____) |
 |_|    \____/|_|  \_\ |______|_|  \_\_____|_____/                                                                
*/

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

/*
  ______ ____  _____    _____ _____  _____  _____ ____  _____  _____       _  _____ 
 |  ____/ __ \|  __ \  |  __ \_   _|/ ____|/ ____/ __ \|  __ \|  __ \     | |/ ____|
 | |__ | |  | | |__) | | |  | || | | (___ | |   | |  | | |__) | |  | |    | | (___  
 |  __|| |  | |  _  /  | |  | || |  \___ \| |   | |  | |  _  /| |  | |_   | |\___ \ 
 | |   | |__| | | \ \  | |__| || |_ ____) | |___| |__| | | \ \| |__| | |__| |____) |
 |_|    \____/|_|  \_\ |_____/_____|_____/ \_____\____/|_|  \_\_____(_)____/|_____/ 
*/

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