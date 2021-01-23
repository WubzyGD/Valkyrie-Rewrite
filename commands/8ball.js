const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    aliases: ["8b"],
    help: new Discord.MessageEmbed()
        .setTitle("Help -> 8ball")
        .setDescription('Answers your questions in an intelligent, honest, ~~completely not random~~ way!')
        .addField("Syntax", '`8ball <question>`'),
    meta: {
        category: 'fun',
        description: 'Answers your questions in an intelligent, honest, ~~completely not random~~ way!',
        syntax: '`8ball <question>`',
        extra: null
    },
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}8ball <question>\``);}
        let question = args.join(" ");
        if (question.length > 230) {return message.reply("Listen, I'm no fortune-teller. I'm not gonna answer your little essay over there.");}

        let responses = [
            "Yes!", "I think so", "Possibly", "I rolled a d6 on it; It's a yes", "Certainly", "Definitely", "Absolutely", "Sure!", "Most Likely", "Dragonborn says yes", "The horde of skeletons seem to think so", "I believe so", "If you're asking for my honest opinion... yes", "I mean I guess you could look at it that way", "I've conjured up the power of my two remaining brain cells and they say yes"
            ,"No!", "I don't think so", "Probably not", "I rolled a d6 on it; it's a no", "Impossible", "Nope", "Absolutely *not*", "Nah", "Doubt it", "Dragonborn says no", "The horde of skeletons doesn't seem to think so", "I don't believe so", "If you're asking for my honest opinion... no", "My personal opinion is no, but some may disagree", "By rubbing my two remaining brain cells together, I have deduced that the answer is... no... not at all."
            ,"Maybe", "I'm not sure", "I'll think about it", "Uhh Valkyrie isn't here right now. I can take a message?", "I'm sure if you look deep within your heart, which is currently all over that tree, you'll find the answer", "I mean, if you think so...", "I don't have an opinion on that.", "I'll choose to remain silent.", "Now is not the time for stupid questions like that! We have a raging tiefling to deal with.", "Uhhh the bard is currently trying to seduce a Hell Dragon and it's not going so well. Can I answer you later?"
        ];
        let name = message.guild ? message.member.displayName : message.author.username;

        return message.reply(new Discord.MessageEmbed()
            .setAuthor("8ball Question", message.author.avatarURL())
            .setDescription("**Question:** " + question + "\n**Answer:** " + responses[Math.floor(Math.random() * responses.length)])
            .setColor("DC134C")
            .setFooter(`Asked by ${name}`)
            .setTimestamp());
    }
};