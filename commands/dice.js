const Discord = require("discord.js");

module.exports = {
    name: "dice",
    aliases: ["die", "d", "rolldice", "diceroll"],
    help: new Discord.MessageEmbed()
        .setTitle("Help -> Dice")
        .setDescription("The center for all things dice-related! Quickly roll a die or dice, or make a new roll to save for later! This command can be really simple, or super complex, so here's a nice, handy guide to using it.")
        .addField("Syntax", "`dice <roll|create|delete|list|info> <roll ID> [-options]`\n`dice [\"reason\"] d<die> d[die] [etc...] [-options]`")
        .addField("Simple Syntax", "By just using `roll d#` you can get a fast and easy roll! Just make sure you start every die with `d`.\n\nThere are some optional things to do for this:\n-You can specify a reason for rolling by placing quotes and some text before the dice\nYou can add some options as well. Use `-option` to do so. Valid options are `-reason <your reason>` or `-against <person>`"),
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}dice <roll|create|delete|list|info> <roll ID> [-options]\` or \`dice [\"reason\"] d<die> d[die] [etc...] [-options]\``);}
        let cdiceo = {"roll": function() {}, "create": function() {}, "delete": function() {}, "list": function() {}, "info": function() {}};
        if (!Object.keys(cdiceo).includes(args[0].toLowerCase().trim())) {
            if (![-1, 0, 2].includes(msg.split('"').length - 1)) {return message.reply("You need two quotes to specify a reason!");}
            var nmsg = message.content; var reason = null; var against = null;
            if (msg.search('"') !== -1) {
                nmsg = nmsg.slice(nmsg.search('"') + 1).trim();
                reason = nmsg.split('"')[0].trim();
                nmsg = nmsg.split('"')[1].trim();
            }

            let dargs = nmsg.split(/\s+/g);
            var dice = []; var midargs = [];
            var options = {
                against: '',
                reason: '',
                force: false
            };
            for (let arg of dargs) {
                if (arg.match(/^[dD](?:\d+)$/)) {dice.push(arg.trim().slice(1));}
                else {midargs.push(arg);}
            }
            if (dice.length > 25) {return message.reply("Unfortunately, because the message size is too large, I cannot roll any more than 25 dice.");}

            let reading = null;
            for (let i = 0; i < midargs.length; i++) {
                let arg = midargs[i];
                if (arg.startsWith('-') && arg.length > 1) {reading = arg.trim().slice(1);}
                else if (reading) {
                    if (reading == "reason" || reading == "r") {options.reason = `${options.reason} ${arg}`;}
                    if (reading == "against" || reading == "a") {options.against = `${options.against} ${arg}`;}
                    if (reading == "force" || reading == "f") {options.force = true;}
                }
                if (arg == "-f" || arg == "-force") {options.force = true;}
            }
            
            reason = options.reason.length ? options.reason : reason !== null ? reason : null;
            against = options.against.length ? options.against : null;
            
            if (options.reason.length > 350) {return message.reply("Listen, I get that you feel the need to write an essay on why your little d6 roll is important, but could you please tone it down a little? Thanks.");}
            if (options.against.length > 75) {return message.reply("Hey there chief, I'm sure you've got a lot of enemies but let's stick to just rolling against one or two of them? *Translation: your 'against' option was too long.*");}

            function verify(dicet, optionss) {
                var v_x;
                if (!dicet.length) {return false;}
                for (v_x of dicet) {
                    if (isNaN(Number(v_x))) {return false;}
                    if (optionss.force === false) {if (![4, 6, 8, 10, 12, 100].includes(Number(v_x))) {/*dice.splice(dice.indexOf(v_x), 1);*/ return false;}}
                }
                return dicet.length >= 1;
            }
            if (!verify(dice, options)) {return message.reply("One of your dice wasn't actually a die, or you didn't give any real dice.");}

            function clean(dicet) {var v_x; var i; let temp = []; for (i=0; i<dicet.length;i++) {v_x=dicet[i]; temp.push(Number(v_x));} return temp;}
            dice = clean(dice);
            function rollp(pdice) {
                function roll(d) {return Math.ceil(Math.random() * d);}
                function rollAll(dicet) {var rd;var i;let temp = [];for (i=0;i<dicet.length;i++) {rd = dicet[i]; temp.push(roll(rd));} return temp;}
                let rolleddice = rollAll(pdice);
                function ms(dicet, ppdice) {
                    var rs = ''; var i; var cd; var cpd;
                    for (i=0;i<dicet.length;i++) {cd=dicet[i]; cpd=ppdice[i]; rs+=`**${i+1}.** Roll \`d${cd}\` -> \`${cpd}\`\n`} return rs;
                }
                let s = ms(pdice, rolleddice);
                function total(dicet) {var v_x = 0; var i; for (i=0; i<dicet.length;i++) {v_x += dicet[i];} return v_x;}
                let t = total(rolleddice);
                return {str: s, total: t};
            }

            let res = against ? {a: rollp(dice), m: rollp(dice)} : rollp(dice);

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
            let forcestr = options.force ? ` This roll may contain forced dice (non-standard dice values)` : ``;
            rollEmbed.setDescription(against ? `Rolled by ${message.member ? message.member.displayName : message.author.username} against ${against}.${forcestr}` : `Rolled by ${message.member ? message.member.displayName : message.author.username}.${forcestr}`);
            if (reason) {rollEmbed.addField("Reason", reason);}
            if (against) {
                rollEmbed.addField(`Attacking Roll: ${message.member ? message.member.displayName : message.author.username}`, res.m.str);
                rollEmbed.addField(`Defending Roll: ${against}`, res.a.str);
            } else {rollEmbed.addField("Your Roll", res.str);}
            rollEmbed.addField("Total", against ? `**${message.member ? message.member.displayName : message.author.username}:** ${res.m.total}\n**${against}:** ${res.a.total}` : `${res.total}`)
            try {return message.channel.send(rollEmbed);}
            catch {return message.reply("Something went wrong. You probably put too many dice... er... something.");}
        }
    }
};