const Discord = require("discord.js");

module.exports = {
    name: "diceduel",
    aliases: [],
    help: "This command doesn't exist anymore!",
    execute(message, msg, args, cmd, prefix, mention, client) {
        return message.channel.send("Hey there! I've recently been updated, and a lot of my features are more stable and concise now. As part of this update, `diceduel` is no longer a command. Instead, you can use `dice -against <person>` to diceduel. This also includes support for multiple dice in a duel as well as naming dice and other cool stuff.");
    }
};