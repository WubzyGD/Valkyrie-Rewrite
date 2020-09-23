const Discord = require("discord.js");

module.exports = {
    name: "dice",
    aliases: ["die", "d"],
    help: new Discord.MessageEmbed()
        .setTitle("Help -> Dice")
        .setDescription("The center for all things dice-related! Quickly roll a die or dice, or make a new roll to save for later! This command can be really simple, or super complex, so here's a nice, handy guide to using it.")
        .addField("Syntax", "`dice <roll|create|delete|list|info> <roll ID> [-options]`\n`dice [\"reason\"] d<die> d[die] [etc...] [-options]`")
        .addField("Simple Syntax", "By just using `roll d#` you can get a fast and easy roll! Just make sure you start every die with `d`.\n\nThere are some optional things to do for this:\n-You can specify a reason for rolling by placing quotes and some text before the dice\nYou can add some options as well. Use `-option` to do so. Valid options are `-reason <your reason>` or `-against <person>`"),
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}dice <roll|create|delete>\``)}
    }
};