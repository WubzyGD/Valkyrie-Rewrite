const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {
            var authorAvatar = new Discord.RichEmbed()
            .setTitle(`Avatar for ${message.member.displayName}`)
            .setImage(message.author.avatarURL);
            if (message.member.displayName == message.author.username) {
                message.channel.send(`Avatar for <@${message.author.id}>:`);
                return message.channel.send(authorAvatar);
            } else {
                message.channel.send(`Avatar for <@!${message.author.id}>:`);
                return message.channel.send(authorAvatar);
            };
        } else {
            if (!mention) {
                return(message.channel.send("You have to mention someone, just to avoid duplicate username confusion :)"));
            };
            var mentionAvatar = new Discord.RichEmbed()
            .setTitle(`Avatar for ${message.member.guild.members.get(mention.id).displayName}`)
            .setImage(mention.avatarURL);
            if (mention.username == message.member.guild.members.get(mention.id).displayName) {
                message.channel.send(`Avatar for <@${mention.id}>:`);
                return message.channel.send(mentionAvatar);
            } else {
                message.channel.send(`Avatar for <@!${mention.id}>:`);
                return message.channel.send(mentionAvatar);
            };
        };
    }
};