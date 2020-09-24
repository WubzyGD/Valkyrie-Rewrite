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
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}dice <roll|create|delete|list|info> <roll ID> [-options]\` or \`dice [\"reason\"] d<die> d[die] [etc...] [-options]\``);}
        let cdiceo = {"roll": function() {}, "create": function() {}, "delete": function() {}, "list": function() {}, "info": function() {}};
        if (!Object.keys(cdiceo).includes(args[0].toLowerCase().trim())) {
            if (![-1, 0, 2].includes(msg.search('"'))) {return message.reply("You need two quotes to specify a reason!");}
            var nmsg = message.content; var reason = null; var against = null;
            if (msg.search('"') === 2) {
                nmsg = nmsg.slice(nmsg.search('"') + 1).trim();
                reason = nmsg.split('"')[0].trim();
                nmsg = nmsg.split('"')[1].trim();
            }

            dargs = nmsg.split(/\s+/g);
            var dice = []; var midargs = []; var options = {against: '', reason: ''};
            for (let arg of dargs) {
                if (arg.match(/^[dD](?:4|6|8|10|12|20|100)$/)) {dice.push(arg.trim().slice(1));}
                else {midargs.push(arg);}
            }
            if (dice.length > 25) {return message.reply("Unfortunately, because the message size is too large, I cannot roll any more than 25 dice.");}

            function rollAll(gdice) {
                for (let die of gdice) {
                    if (isNaN(die) || ![4, 6, 8, 10, 12, 20, 100].includes(Number(die))) {return message.reply("One of your dice wasn't actually a die!");}
                    gdice[gdice.indexOf(die)] = Math.ceil(Math.random() * Number(die));
                }
                return gdice;
            }
            function formatRolls(dicerolls) {
                let rollresultsstring = "";
                for (let i = 0; i <= (dicerolls.length - 1); i++) {
                    rollresultsstring += `**${i + 1}.** Roll d${dice[i]}: \`${dicerolls[i]}\`\n`;
                }
                return rollresultsstring;
            }

            let reading = null;
            for (let i = 0; i < midargs.length; i++) {
                let arg = midargs[i];
                if (arg.startsWith('-') && arg.length > 1) {reading = arg;}
                if (reading) {
                    if (reading === "reason") {options.reason += arg;}
                    if (reading === "against") {options.against += arg;}
                }
            }
            console.log(options.reason, options.against);
            reason = options.reason.length ? options.reason : reason !== null ? reason : null;
            against = options.against.length ? options.against : null;
            console.log(reason, against);
            if (options.reason.length > 350) {return message.reply("Listen, I get that you feel the need to write an essay on why your little d6 roll is important, but could you please tone it down a little? Thanks.");}
            if (options.against.length > 75) {return message.reply("Hey there chief, I'm sure you've got a lot of enemies but let's stick to just rolling against one or two of them? *Translation: your 'against' option was too long.*");}
            console.log(dice);
            let res = against ? {m: formatRolls(rollAll(dice)), a: formatRolls(rollAll(dice))} : formatRolls(rollAll(dice));

            let rollEmbed = new Discord.MessageEmbed()
                .setThumbnail(message.author.avatarURL({size: 1024}))
                .setColor("DC134C")
                .setFooter("Valkyrie", client.user.avatarURL())
                .setTimestamp();
            rollEmbed.setTitle(against
                ? reason
                    ? `Dice Duel with Reason`
                    : `Standard Dice Duel`
                : reason
                    ? `Dice Roll with Reason`
                    : `Standard Dice Roll`
            );
            rollEmbed.setDescription(against ? `Rolled by ${message.member ? message.member.displayName : message.author.username} against ${against}.` : `Rolled by ${message.member ? message.member.displayName : message.author.username}.`);
            if (reason) {rollEmbed.addField("Reason", reason);}
            if (against) {
                rollEmbed.addField(`Attacking Roll: ${message.member ? message.member.displayName : message.author.username}`, res.m);
                rollEmbed.addField(`Defending Roll: ${against}`, res.a);
            } else {rollEmbed.addField("Your Roll", res);}
            try {return message.channel.send(rollEmbed);}
            catch {return message.reply("Something went wrong. You probably put too many dice... er... something.");}
        }
    }
};