const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');

module.exports = {
    name: "reload",
    aliases: ['relog', 'rel', 'refresh'],
    help: new Discord.MessageEmbed()
        .setTitle("Help -> System Reloading")
        .setDescription("Reloads the system extensions by refreshing all command and event files into client without terminating the node process. *Hi I'm Wubzy and this makes no sense to anyone but discord.js devs because we're nerds*")
        .addField("Syntax", "`refresh [log]`. Adding 'log' will log to the console as though the bot were in startup.")
        .addField("Notice", "Only my creator can use this command."),
    meta: {
        category: 'Developer',
        description: "Reloads the client and flushes all commands and event handlers. For nerds only.",
        syntax: '`reload [log]`',
        extra: null
    },
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {
            if (client.config.dev !== message.author.id) {return message.channel.send("You must be my developer in order to do this!");}

            let commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            console.log(`\n${chalk.yellow('[WARN]')} >> ${chalk.gray('Reload:')} ${chalk.white('All commands and events are being reloaded!')}`);
            console.log(`${chalk.gray('[INFO]')} >> ${chalk.hex('ff4fd0')(`Developer ${message.author.username} initiated the system refresh`)}\n`);

            ['commands', 'aliases'].forEach(x => client[x] = new Discord.Collection());
            for (let commandf of commands) {
                if (Object.keys(require.cache).includes(require.resolve(`./${commandf}`))) {delete require.cache[require.resolve(`./${commandf}`)];}
                let command = require(`./${commandf}`);
                client.commands.set(command.name, command);
                if (command.aliases) {command.aliases.forEach(a => client.aliases.set(a, command.name));}
            }
            console.log(`${chalk.gray('[LOG]')}  >> ${chalk.blue('Loaded all Commands')}`);

            let eventFilter = fs.readdirSync('./events/').filter(x => x.endsWith('.js'));
            for (let file of eventFilter) {
                let evtName = file.split('.')[0];
                if (Object.keys(require.cache).includes(require.resolve('../events/' + file))) {delete require.cache[require.resolve('../events/' + file)];}
                let evt = require('../events/' + file);
                client.removeAllListeners(evtName);
                client.on(evtName, evt.bind(null, client));
            }
            console.log(`${chalk.gray('[LOG]')}  >> ${chalk.blue('Loaded all Events')}`);

            /*var responses = fs.readdirSync('./responses').filter(file => file.endsWith('.js'));
            client.responses.triggers = [];
            for (let responsef of responses) {
                if (Object.keys(require.cache).includes(require.resolve(`../responses/${responsef}`))) {delete require.cache[require.resolve(`../responses/${responsef}`)];}
                var response = require(`../responses/${responsef}`);
                client.responses.triggers.push([response.name, response.condition]);
                client.responses.commands.set(response.name, response);
            }
            console.log(`${chalk.gray('[LOG]')}  >> ${chalk.blue('Loaded all Responses')}`);*/

            console.log(`\n${chalk.gray('[INFO]')} >> ${chalk.hex('ff4fd0')(`Client refresh successful`)}\n`);

            return message.channel.send("Done!")
        }
        if (['l', 'log', 'ns', 'nosilent', 'notsilent'].includes(args[0].toLowerCase())) {
            ['commands', 'aliases'].forEach(x => client[x] = new Discord.Collection());
            client.responses = {triggers: [], commands: new Discord.Collection()};
            ['command', 'event'/*, 'response'*/].forEach(x => require(`./${x}`)(client));
            return message.channel.send("Done!");
        }
        else {return message.channel.send("Oi! 'log' is the only valid arg to use. Use no args if you want a cleaner console output instead.");}
    }
};