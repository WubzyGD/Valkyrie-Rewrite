const Discord = require('discord.js');
const chalk = require('chalk');
const wait = require('../util/wait');

module.exports = async (client, message) => {
    if (message.author.bot) {return undefined;}
	if (message.channel.type === 'dm') /*{let dmch = true;} else {let dmch = false};*/ {return undefined;}
	if (message.channel.type !== 'text' && message.channel.type !== 'dm') {return undefined;}

	//if (message.channel.type == "text") {if (settings[message.guild.id]) {prefix = settings[message.guild.id].prefix;};};

    if (message.guild && !message.member.permissions.has("SEND_MESSAGES")) {return undefined;}
	
    const prefix = 'v..';

	let msg = message.content.toLowerCase();
	let mention = message.mentions.users.first();
    let args = msg.startsWith(prefix)
        ? message.content.slice(prefix.length).trim().split(/\s+/g) 
        : msg.startsWith('<@!') 
            ? message.content.slice(4 + client.user.id.length).trim().split(/\s+/g)
            : message.content.slice(3 + client.user.id.length).trim().split(/\s+/g);
	let cmd = args.shift().toLowerCase().trim();

    try {
        if (msg.startsWith(prefix) || msg.startsWith(`<@${client.user.id}>`) || msg.startsWith(`<@!${client.user.id}>`)) {
            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            if (!command) {return;}
            message.channel.startTyping();
            await wait(800);
            message.channel.stopTyping();
            require('../util/oncommand')(message, msg, args, cmd, prefix, mention, client);
            if (command.meta && command.meta.guildOnly && !message.guild) {return message.channel.send("That command can only be used in a server!");}
            command.execute(message, msg, args, cmd, prefix, mention, client);
        }
    } catch (e) {
        let date = new Date; date = date.toString().slice(date.toString().search(":") - 2, date.toString().search(":") + 6);
        console.error(`\n${chalk.red('[ERROR]')} >> ${chalk.yellow(`At [${date}] | In ${message.guild.name}\n`)}`, e);
    }
};