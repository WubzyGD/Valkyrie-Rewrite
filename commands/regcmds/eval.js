const Discord = require("discord.js");
const Util = require("util");

module.exports = {
    name: "eval",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (message.author.id != "330547934951112705" && message.author.id != "335792072638595083") {return;};
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            function clean (text) {
                if (typeof(text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            };
            if (typeof evaled !== "string")
                evaled1 = require("util").inspect(evaled);
                message.channel.send(clean(evaled1), {code:"xl"});
            } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};