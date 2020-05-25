const { SuperError } = require("../Error");
const { ReactionCollector } = require("eris-collector");
require("colors");

function Paginate(client, message, pages, options = { 
    time: 1000 * 60 * 3, 
    onEnd: "removeAll" 
}, emojis = {
    backward: "⏪",
    stop: "🛑",
    forward: "⏩"
}) {

    this.client = client;
    this.message = message;
    this.pages = pages;
    this.options = options;
    this.emojis = emojis;

    if (!this.client) throw new SuperError("Specify the client to be processed on.", "DeficiencyError");
    if (!this.message) throw new SuperError("Specify the message to be processed on.", "DeficiencyError");
    if (!this.pages) throw new SuperError("Specify pages to be shown", "DeficiencyError");
    if (!this.options.time) throw new SuperError("Specify a reaction time.", "TimeError");
    if (
        !this.emojis.backward ||
        !this.emojis.stop || 
        !this.emojis.forward
    ) throw new SuperError("Specify emojis to skip the page, return to previous page and stop the process.", "EmojiError");

    this.addPage = function(page) {
        if (!page) throw new SuperError("Specify the page to be added", "DeficiencyError");
        try {
            if (Array.isArray(page)) {
                this.pages = this.pages.concat(page);
            } else {
                this.pages.push(page);
            }
            return { pages: this.pages };
        } catch(err) {
            throw new SuperError(err, "UnknownError");
        }
    }

    this.editEmoji = function(name, value) {
        if (!name) throw new SuperError("Specify the emoji name to be edited", "DeficiencyError");
        if (!value) throw new SuperError("Specify an emoji.", "DeficiencyError");
        switch (name) {
            case "backward":
                this.emojis[name] = value;
                break;
            case "stop":
                this.emojis[name] = value;
                break;
            case "forward":
                this.emojis[name] = value;
                break;
            default:
                throw new SuperError("Specify a valid emoji name to be edited.", "DeficiencyError");
        }
    }

    this.init = async function() {
        let page = 1;
        let msg = await this.client.createMessage(this.message.channel.id, this.pages[page - 1]);

        await msg.addReaction(this.emojis.backward).catch((err) => {
            throw new SuperError("Specify a valid backward emoji", "EmojiError");
        });
        await msg.addReaction(this.emojis.stop).catch((err) => {
            throw new SuperError("Specify a valid stop emoji", "EmojiError");
        });
        await msg.addReaction(this.emojis.forward).catch((err) => {
            throw new SuperError("Specify a valid forward emoji", "EmojiError");
        });

        let backwardFilter = (message, emoji, userID) => emoji.name === this.emojis.backward && userID === this.message.author.id;
        let stopFilter = (message, emoji, userID) => emoji.name === this.emojis.stop && userID === this.message.author.id;
        let forwardFilter = (message, emoji, userID) => emoji.name === this.emojis.forward && userID === this.message.author.id;

        let backward = new ReactionCollector(this.client, msg, (backwardFilter), {
            time: this.options.time
        });

        let stop =  new ReactionCollector(this.client, msg, (stopFilter), {
            time: this.options.time
        });

        let forward = new ReactionCollector(this.client, msg, (forwardFilter), {
            time: this.options.time
        });

        backward.on("collect", async (message, emoji, userID) => {
            await msg.removeReaction(emoji.name, userID);

            if (page === 1) return;
            page--;
            
            if (typeof this.pages[page - 1] == "object") {
                await msg.edit({
                    content: null, 
                    embed: this.pages[page - 1]
                });
            } else {
                await msg.edit({
                    content: this.pages[page - 1], 
                    embed: null
                });
            }
        });

        stop.on("collect", async (message, emoji, userID) => {

            if (this.options.onEnd == "remove") {
                await msg.removeReaction(emoji.name, userID);
            } else if (this.options.onEnd == "removeAll") {
                await msg.removeReactions();
            } else if (this.options.onEnd == "delete") {
                await msg.delete();
            }

            backward.stop("ENDED");
            forward.stop("ENDED");
            stop.stop("ENDED");
        });

        forward.on("collect", async (message, emoji, userID) => {
            await msg.removeReaction(emoji.name, userID);

            if (page === this.pages.length) return;
            page++;

            if (typeof this.pages[page - 1] == "object") {
                await msg.edit({
                    content: null, 
                    embed: this.pages[page - 1]
                });
            } else {
                await msg.edit({
                    content: this.pages[page - 1], 
                    embed: null
                });
            }
        });

        backward.on("end", (collected, reason) => {
            if (reason == "time") throw new SuperError("Specify a valid time", "TimeError");
            if (reason != "ENDED") throw new SuperError(reason, "UnknownError");
        });

        stop.on("end", (collected, reason) => {
            if (reason == "time") throw new SuperError("Specify a valid time", "TimeError");
            if (reason != "ENDED") throw new SuperError(reason, "UnknownError");
        });

        forward.on("end", (collected, reason) => {
            if (reason == "time") throw new SuperError("Specify a valid time", "TimeError");
            if (reason != "ENDED") throw new SuperError(reason, "UnknownError");
        });

        return {
            backwardCollector: backward,
            stopCollector: stop,
            forwardCollector: forward
        };
    }



}

module.exports = Paginate;