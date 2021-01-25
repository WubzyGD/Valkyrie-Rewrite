const Discord = require("discord.js");

module.exports = {
    name: "calc",
    aliases: ['calculate', 'add'],
    help: new Discord.MessageEmbed()
        .setTitle("Help -> Calculate")
        .setDescription("Can do some simple arithmetic for you quickly and easily")
        .addField("Syntax", "`calc <num1> <*|x|/|+|-> <num2>`"),
    meta: {
        category: 'Utility',
        description: "Calculates given numbers - handles only basic arithmetic",
        syntax: '`calc <num1> <*|x|/|+|-> <num2>`',
        extra: null
    },
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}calc <num1> <*|x|/|+|-> <num2>\``);}
        if (args.length < 3) {return message.channel.send("You must have two numbers and an operation, for example `3 * 10`");}

        let num1 = args[0];
        let num2 = args[2];
        let operation = args[1];

        if (isNaN(Number(num1)) || isNaN(Number(num2))) {return message.channel.send("One of your numbers was not actually a number! Please try again.");}
        num1 = Number(args[0]);
        num2 = Number(args[2]);
        if (num1 > 100000 || num2 > 100000 || num1 < -100000 || num2 < -100000) {return message.channel.send("One of your numbers was either higher than 100,000 or less than -100,000. Try again");}
        if (!['x', '*', "/", '+', '-'].includes(operation)) {return message.channel.send("You didn't provide a valid operation! Must be `<*|x|/|+|->`");}
        if (operation === '/' && num2 === 0) {return message.channel.send("Oi oi! I'm not stupid!");}

        let res;
        switch (operation) {
            case 'x': case '*': res = num1 * num2; break;
            case '/': res = num1 / num2; break;
            case '+': res = num1 + num2; break;
            case '-': res = num1 - num2; break;
        }

        return message.channel.send(`Beep boop. Your result is: \`${res}\``);
    }
};