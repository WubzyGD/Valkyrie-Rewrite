const Discord = require("discord.js");

module.exports = {
    name: "dice",
    aliases: ["die", "d"],
    help: '...rly bro?',
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {

        } else {
            var command;
            if (client.commands.has(args[0])) {command = client.commands.get(args[0]);}
            else if (client.aliases.has(args[0])) {command = client.commands.get(client.aliases.get([args[0]]));}
            else {return message.reply("I don't have that command! Try using `" + prefix + "help` to get a list of my commands");}

            return message.reply(command.help ? command.help : "I don't seem to have any help info available for that command.");
        }
    }
};