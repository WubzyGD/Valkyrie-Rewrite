const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "meme",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}meme use <memeName>\` to have Valk send a meme/reaction image. Use \`list\` as the meme name to show available options.`);};
        message.delete();
        if (args[0] == "use") {
            var meme = args[1];
            if (meme == "list") {return message.reply("Memes/Reaction image flags are: `shut`, `yikes`, `brain`, `tompaper`, `excusewtf`" + 
            ", `considerthefollow`, `thomasbs`, `bigno`, `doot`, `chacha`, `yessir`, `shockok`, `dogseize`, "
            + "`fukusay`, `noaccidents`, `bonehurtjuice`, `f`.");};
            if (meme == "shut") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/674081841778524160/IMG_20200120_012215_921.jpg"};
            if (meme == "yikes") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/674082003137724416/received_474102026641520.jpeg"};
            if (meme == "brain") {var link = "https://tenor.com/view/big-brain-markiplier-gif-14835823"};
            if (meme == "tompaper") {var link = "https://cdn.discordapp.com/attachments/472596691263029261/677720511777603614/300px-Tom_Cat_Reading_a_Newspaper.png"};
            if (meme == "excusewtf") {var link = "https://cdn.discordapp.com/attachments/472596691263029261/677722640940531732/excusemewhatthefuck.PNG"};
            if (meme == "considerthefollow") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472746918969366/received_715478235596053.jpeg"};
            if (meme == "thomasbs") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683471956271562752/SmartSelect_20200229-173317_Samsung_Internet.jpg"};
            if (meme == "bigno") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472747174559769/received_487285101872462.jpeg"};
            if (meme == "doot") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472747422416950/received_785158701904335.jpeg"};
            if (meme == "chacha") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472747787059244/received_1141845076005698.jpeg"};
            if (meme == "yessir") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472748051169318/received_2693882840729239.jpeg"};
            if (meme == "shockok") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472748240044078/received_2100330400069375.jpeg"};
            if (meme == "dogseize") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472748411879509/received_414667849433267.jpeg"};
            if (meme == "fukusay") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472748688834654/received_1354559018035549.jpeg"};
            if (meme == "noaccidents") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472749045481533/received_894776877589314.jpeg"};
            if (meme == "bonehurtjuice") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472749242351616/55940bb.jpg"};
            if (meme == "f") {var link = "https://cdn.discordapp.com/attachments/646137098335682579/683908052272939032/Press-F-to-Pay-Respects-meme-Call-of-Duty.jpg"};
            if (!link) {return message.reply("I don't have the meme `" + meme + "`!");};
            return message.channel.send(`Sender: ${message.member.displayName}`, new Discord.Attachment(link));
        }
        else if (args[0] == "avatar") {
            var meme = args[1];
            if (meme == "roloshoot") {
                if (!mention || !args.shift().shift().length) {return message.reply("You have to mention someone else for this meme!");};
                message.delete();
                try {const canvas = Canvas.createCanvas(630, 360);
		        const ctx = canvas.getContext('2d');

		        const background = await Canvas.loadImage('./images/templates/avatar/roloshoot.png');
                await ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                if (args[2] == "flip") {
                    var pfp2 = await Canvas.loadImage(message.author.avatarURL);
                    var pfp1 = await Canvas.loadImage(mention.avatarURL);
                } else {
                    var pfp1 = await Canvas.loadImage(message.author.avatarURL);
                    var pfp2 = await Canvas.loadImage(mention.avatarURL);
                };
                await ctx.drawImage(pfp2, 30, 66, 220, 220);
                await ctx.drawImage(pfp1, 550, 90, 80, 80);
                return message.channel.send(`Sender: ${message.member.displayName}`, new Discord.Attachment(canvas.toBuffer(), 'valk-meme-roloshoot.png'));
                //30, 66 -> 220
                //550, 90 -> 80
                } catch (e) {console.log(e); return message.reply("Huh... something went wrong there. Try again maybe?");};
            };
        };
    }
};