const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "info",
    aliases: ["i", "botinfo", "bot"],
    help: "There's not really anything to help with here! Just use `{{p}}info` to learn more about me!",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        let botData = await require('../models/bot').findOne({finder: 'lel'});

        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("About Me!", client.users.cache.get("330547934951112705").avatarURL())
            .setThumbnail(client.user.avatarURL({size: 1024}))
            .setDescription(`I am created by WubzyGD#8766 in JavaScript/Discord.js, and have been alive for over a year! \n\nI'm your #1 choice in dungeon dragons, and your #1 choice for Dungeons *and* Dragons!`)
            .addField("Presence", `I'm currently in **${client.guilds.cache.size}** servers, and I'm watching over approximately **${client.users.cache.size}** people!`)
            .addField("Restarts", botData.restarts, true)
            .addField("Commands Executed", botData.commands, true)
            .addField("Last Restart", moment(botData.lastRestart).fromNow(), true)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp());
    }
};