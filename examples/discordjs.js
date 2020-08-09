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