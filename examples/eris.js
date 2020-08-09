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