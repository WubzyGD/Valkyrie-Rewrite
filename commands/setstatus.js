const Discord = require('discord.js');

const {TagFilter} = require('../util/tagfilter');
const {Tag} = require('../util/tag');

module.exports = {
    name: "setstatus",
    aliases: ['sst'],
    meta: {
        category: 'developer',
        description: "",
        syntax: '` <>`',
        extra: null
    },
    tags: [],
    help: new Discord.MessageEmbed()
    .setTitle("Help -> Status-Setting")
    .setDescription("Sets my status")
    .addField("Syntax", "`setstatus <status> [type]`")
    .addField('Notice', "This command is **developer-only**"),
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}setstatus <status> [type]\``);}
        if (message.author.id !== client.config.dev) {return message.channel.send("You must be my developer in order to do that!");}

        let options = new TagFilter([
            new Tag(['s', 'status', 'm', 'msg', 'message'], 'status', 'append'),
            new Tag(['t', 'type'], 'type', 'append')
        ]).test(args.join(" "));
        if (!options.status || !options.status.length) {return message.channel.send("You must use the -status tag (and -type if you want a custom type)!");}

        if (options.status.length > 30) {return message.reply("That status is a bit too long.");}
        if (options.type) {if (!['playing', 'watching', 'listening'].includes(options.type.toLowerCase())) {return message.channel.send("That's not a valid type!");}}
        
        if (options.type) {client.user.setActivity(options.status, {type: options.type.toUpperCase()});}
        else {client.user.setActivity(options.status);}
        return message.channel.send(`Status set to: \`${options.type ? `${options.type.slice(0, 1).toUpperCase()}${options.type.slice(1).toLowerCase()}` : "Playing"} ${options.status}\``);
    }
};