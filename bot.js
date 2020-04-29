﻿const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const Canvas = require("canvas");
const gbl = require("gblapi.js");

const fs = require("fs");
client.commands = new Discord.Collection();

const Wubzy = "330547934951112705";

const regCommands = fs.readdirSync("./commands/regcmds").filter(file => file.endsWith(".js"));
for (var file of regCommands) {
	const command = require(`./commands/regcmds/${file}`);
	client.commands.set(command.name, command);
};
const admCommands = fs.readdirSync("./commands/admcmds").filter(file => file.endsWith(".js"));
for (var file of admCommands) {
	const command = require(`./commands/admcmds/${file}`);
	client.commands.set(command.name, command);
};

function wait(time) {
	return new Promise(function (resolve) {
		setTimeout(function () {
		  	resolve("anything");
		}, time);
	});
};

const GBLValk = new gbl("619305062900039726", 'XA-ecf51d0686fd4f6f8232f16f835367a8', false);

var cmdcount = 0;

var dmcmds = ["theme", "bj"];
var chcmds = ["slap", "battle", "serverinfo", "secretsanta", "vibecheck", "poll", ""];

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const diceRolled = sequelize.import("./models/dicerolled");
const userGameData = sequelize.import("./models/usergamedata");
const serverSettings = sequelize.import("./models/serversettings");

var e = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force: e}).then(async () => {}).catch(console.error);

//https://discordapp.com/oauth2/authorize?client_id=619305062900039726&scope=bot&permissions=1544547430 e

console.log("All commands successfully loaded with no errors!\n");

const info = require("./info.json");

const prefix = "v.";
const adminPrefix = "adm.";

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;
	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};

var last_treasureRoll = new Date().toString();

client.login(config.id);

fs.access("./database.sqlite", fs.F_OK, (err) => {
	if (err) {
	  	console.log("Database doesn't exist");
	  	return;};
	});

client.on("ready", async () => {
	try {
	var date = new Date; date = date.toString().slice(date.toString().search(":") - 2, date.toString().search(":") + 6);
	console.log("Logged in at " + date +"!");
	console.log("Logged in as " + client.user.username);
	console.log("Client ID: " + client.user.id);
	console.log("Running on " + client.guilds.size + " guilds and serving " + client.users.size + " members.");

	console.log("\nSuccessfully loaded Sequelize database(s)");
	
  	var responses = new Array("some high rolls...", "with dice...", "a great rpg...", "with the laws of the dice...", 
  	"with the dead elf's knife...", "with skeleton bones...", "with a new set of dice...", "five-finger filet...", 
  	"with the sanity of the bard...", "with Wubzy's winning chances...", "with Wubzy's patience...", "with the idea of becoming self-aware...",
  	"\"your code is wrong, wubzy\"", "with fire...", "with my food...", "with a fireball...", "dodge-fire-ball...",
  	"cards with Wubzy...", "with my code...", "roll to seduce...", "in blood...", "with a fishing rod...", 
	"52-Card Burn-up...", "some bops...", "battle music...", "country music during a battle...", "at being insane...",
	"I'm self-aware now...", "with newfound boredom...", "with a will to die...", "with stonks...", "with a deagle...",
	"with your server ;)...", "in a lava pool...", "piano, just badly...", "for only myself...", "with the odds...",
	"in purgatory...", "..."
	,`in ${client.guilds.size} servers...`, );
	client.user.setActivity(responses[Math.floor(Math.random() * responses.length)] + " | " + prefix + "help", { type: 'PLAYING' });
	} catch (e) {};
});

client.on('guildCreate', async (guild) => {
    GBLValk.updateStats(client.guilds.size);
});

client.on('guildMemberAdd', async member => {
	await sequelize.sync({force: e}).then(async () => {}).catch(console.error);
	var thisServerSettings = await serverSettings.findOne({where: {guild_id: member.guild.id}});
	if (!thisServerSettings) {
		//console.log("i am here. bad here.");
		await serverSettings.create({
			guild_name: member.guild.name,
			guild_id: String(member.guild.id),
		});
		var thisServerSettings = await serverSettings.findOne({where: {guild_id: member.guild.id}});
	};
	try {
	if (thisServerSettings.join_role !== "none") {
		//console.log("i am here. good here.");
		var role = member.guild.roles.get(thisServerSettings.join_role.slice(3, thisServerSettings.join_role.length - 1).trim());
		//console.log(role, thisServerSettings.join_role);
		if (!role) {/*console.log("other vere bad here");*/ serverSettings.update({join_role: "none"}, {where: {guild_id: member.guild.id}}); var thisServerSettings = await serverSettings.findOne({where: {guild_id: member.guild.id}});};
	};
	if (thisServerSettings.welcome_message_channel !== "none") {
		//console.log("i am here. also good here.");
		var channel = member.guild.channels.get(thisServerSettings.welcome_message_channel.slice(2, thisServerSettings.welcome_message_channel.length - 1).trim());
		//console.log(channel, thisServerSettings.welcome_message_channel);
		if (!channel) {/*console.log("vere bad here");*/ serverSettings.update({welcome_message_channel: "none"}, {where: {guild_id: member.guild.id}}); var thisServerSettings = await serverSettings.findOne({where: {guild_id: member.guild.id}});};
	};
	console.log(thisServerSettings.join_role.slice(3, thisServerSettings.join_role.length - 1).trim(), thisServerSettings.welcome_message_channel.slice(2, thisServerSettings.welcome_message_channel.length - 1).trim());
	if (role != "none") {console.log(role); member.addRole(role.id).catch(console.error);};
	var join_extraOptions = new Array("Careful, the tiefling riled up the skeletons.", 
	"Be warned, the wizard is a little irritable, he just rolled pretty low.", "Careful, dice rolls are a little low today.", 
	"Look on the bright side, finally someone other than the dragonborn can help take care of the goblins.", 
	"I hope you brought HP.", "You better have good gear.", "Bad timing, the boss just showed up. Free health potions? Anyone?",
	"Now isn't the best time. The tiefling is forcing her worship on the party, and it's come to knives.",
	"I hope you're good at five finger filet. The barbarian made a deal I don't think he can get out of...",
	"You've been to dungeon floors this low... right? Wait a minute, do I hear rumbling? I don't think that's the barbarian's stomach.",
	"Look, for once, it's actually pretty melow here... Unless you don't count nine dragons and a goblin army as just another Tuesday.",
	"Here's a sword, a helmet, and an excerpt from the Bible, good luck in there.", "Did you bring applesauce? -Asher Crestworth",
	"Don't pay attention to the dark cavern over there. Except for when you go into it in a minute.");
	var chosen_join_extraOptions = Math.floor(Math.random() * join_extraOptions.length);
	try {
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');

		const background = await Canvas.loadImage('./wallpaper.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);

		ctx.font = '28px sans-serif';
		ctx.fillStyle = '#ffffff';
		ctx.fillText('Welcome to the dungeon,', canvas.width / 2.5, canvas.height / 3.5);

		ctx.font = applyText(canvas, member.displayName);
		ctx.fillStyle = '#ffffff';
		ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		const avatar = await Canvas.loadImage(member.guild.iconURL);
		ctx.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

		if (channel !== "none") {channel.send(`**${member.displayName}** just joined the fight. ${join_extraOptions[chosen_join_extraOptions]}`, attachment);};
	} catch (error) {console.log(error);};} catch (e) {console.log(e);};
});

client.on('guildMemberRemove', async member => {
	await sequelize.sync({force: e}).then(async () => {}).catch(console.error);
	try {
		var thisServerSettings = await serverSettings.findOne({where: {guild_id: member.guild.id}});
		if (!thisServerSettings) {
			await serverSettings.create({
				guild_name: member.guild.name,
				guild_id: String(member.guild.id),
			});
			var thisServerSettings = await serverSettings.findOne({where: {guild_id: member.guild.id}});
		};
		if (thisServerSettings.leave_message_channel !== "none") {
			var channel = member.guild.channels.get(thisServerSettings.leave_message_channel.slice(2, thisServerSettings.leave_message_channel.length - 1).trim());
			if (!channel) {serverSettings.update({leave_message_channel: "none"}, {where: {guild_id: member.guild.id}}); var thisServerSettings = await serverSettings.findOne({where: {guild_id: member.guild.id}});};
		};
		if (channel !== "none") {channel.send(member.displayName + ' left the server. They probably got eaten by goblins.').catch(console.error);};
	} catch (e) {
		console.log(e, channel, thisServerSettings.channel);
	};
});

client.on("message", async message => {
	await sequelize.sync({force: e}).then(async () => {}).catch(console.error);
	try {
	if (message.author.bot) { return undefined; }
	if (message.channel.type == 'dm') {var dmch = true;} else {var dmch = false};
	if (message.channel.type !== 'text' && message.channel.type !== 'dm') { return undefined; }
	
	var msg = message.content.toLowerCase();
	var mention = message.mentions.users.first();
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	var cmd = args.shift().toLowerCase();

	if (message.content === '!join') {
		if (message.author.id != Wubzy) {return;};
		message.channel.send("Simulating member join...");
		client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
	};

	if (msg.startsWith(prefix)) {cmdcount += 1;}; if (msg.startsWith(prefix) && cmd == "cmdcount") {return message.channel.send(new Discord.RichEmbed().setAuthor("Commands Executed since last restart", client.user.avatarURL).setDescription(`${cmdcount} commands.`));};

	if (message.channel.id == "691149309755916370" && (msg.startsWith(prefix)) && (cmd !== "shop") && (message.author.id !== Wubzy)) {return message.delete();};

	var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
	if (!pstats) {
		await userGameData.create({
			user_id: message.author.id,
			username: message.author.username,
			last_xpGain: new Date().toString(),
			xp: 0,
			level: 1,
			prestige: 0,
			fighters_count: 0,
			money: 100,
			lost_remnants: 0,
			prestige_fighters_count: 0,
			boss_damage_done: 0,
			ancient_boss_damage_done: 0
		});
		var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
	};
	if ((new Date().getTime() - new Date(pstats.last_xpGain).getTime()) / 1000 >= 60) {
		if (message.channel.type == "text" && message.channel.guild.id == "679127746592636949") {var guildBoost = 1.5;} else {var guildBoost = 1;};
		await userGameData.update({money: Math.floor(15 * (pstats.lost_remnants + 1) * ((pstats.prestige + 2) * .5) * guildBoost) + pstats.money}, {where: {user_id: message.author.id}});
		await userGameData.update({xp: Math.floor(10 * (pstats.lost_remnants + 1) * ((pstats.prestige + 2) * .5) * guildBoost) + pstats.xp}, {where: {user_id: message.author.id}});
		await userGameData.update({last_xpGain: new Date().toString()}, {where: {user_id: message.author.id}});
	};
	if (pstats.xp > ((pstats.level * 100) + ((pstats.level * 6) + (0.3 * (100 * pstats.level))))) {
		var thisServerSettings = await serverSettings.findOne({where: {guild_id: message.member.guild.id}});
		if (!thisServerSettings) {
		await serverSettings.create({guild_name: message.member.guild.name, guild_id: String(message.member.guild.id)});
		var thisServerSettings = await serverSettings.findOne({where: {guild_id: message.member.guild.id}});};
		if (thisServerSettings.level_update == true) {message.channel.send(`Congratulations ${message.member.displayName} on reaching Level ${pstats.level + 1}`);};
		totalLevelXP = ((pstats.level * 100) + ((pstats.level * 6) + (0.3 * (100 * pstats.level))))
		await userGameData.update({level: pstats.level + 1}, {where: {user_id: message.author.id}});
		await userGameData.update({xp: (pstats.xp - totalLevelXP)}, {where: {user_id: message.author.id}});
		if (client.guilds.get("679127746592636949").members.has(message.author.id)) {client.guilds.get("679127746592636949").channels.get("691149365372256326").send(`<@${message.author.id}> has leveled up to Level ${pstats.level + 1}!`);};
	};

	async function spawnTreasure() {
		var xpintreasure = (Math.ceil(Math.random() * 1300)) + 200;
		var moneyintreasure = (Math.ceil(Math.random() * 1300)) + 200;
		var chestEmbed = new Discord.RichEmbed()
		.setTitle("Treasure Chest")
		.setDescription("A Treasure Chest has spawned!\n\nSay \"claim\" to get the chest! Only one person can claim it, and you'll have an hour from before it expires.")
		.addField("In the chest", `**${xpintreasure} XP**\n**${moneyintreasure} Coins**`)
		.setColor("DC134C")
		.setFooter("Valkyrie", client.user.avatarURL)
		.setTimestamp();
		client.guilds.get("679127746592636949").channels.get("691149517021511722").send(chestEmbed);
		try {var filter = m => m.channel.id == "691149517021511722" && m.content.toLowerCase().includes("claim");
		var claimed = await client.guilds.get("679127746592636949").channels.get("691149517021511722").awaitMessages(filter, {time: (60 * 10000), max: 1});
		var tpstats = await userGameData.findOne({where: {user_id: claimed.first().author.id}}); if (!tpstats) {
		await userGameData.create({
			user_id: message.author.id, username: message.author.username,
			last_xpGain: new Date().toString(), xp: 0, level: 1, prestige: 0, fighters_count: 0, money: 100,
			lost_remnants: 0, prestige_fighters_count: 0, boss_damage_done: 0, ancient_boss_damage_done: 0
		});
		var tpstats = await userGameData.findOne({where: {user_id: claimed.first().author.id}});};
		await userGameData.update({xp: Math.floor(xpintreasure * (tpstats.lost_remnants + 1) * ((tpstats.prestige + 2) * .5)) + tpstats.xp}, {where: {user_id: tpstats.user_id}});
		await userGameData.update({money: Math.floor(moneyintreasure * (tpstats.lost_remnants + 1) * ((tpstats.prestige + 2) * .5)) + tpstats.money}, {where: {user_id: tpstats.user_id}});
		return client.guilds.get("679127746592636949").channels.get("691149517021511722").send("The chest has been claimed!");
		} catch (e) {return client.guilds.get("679127746592636949").channels.get("691149517021511722").send("Ope! Looks like nobody claimed the chest. Whelp Asher, all yours.");};
	};
	if (((new Date().getTime() - new Date(last_treasureRoll).getTime()) / 1000 >= 60) && Math.floor(Math.random() * 100) <= 1) {spawnTreasure(); last_treasureRoll = new Date().toString();}
	else if ((new Date().getTime() - new Date(last_treasureRoll).getTime()) / 1000 >= 60) {last_treasureRoll = new Date().toString();};
	if (msg.startsWith(prefix) && (cmd == "dicecount" || cmd == "rollcount")) {
		var tempDieCount = await diceRolled.findOne({where: {user_id: String(message.author.id)}});
		if (tempDieCount) {return message.reply(`You have rolled dice ${tempDieCount.dice_rolled} times.`);}
		else {return message.reply("You haven't rolled any dice yet!");};
	} else if (msg.startsWith(prefix) && (cmd == "getdata") && message.author.id === Wubzy) {
		client.users.get(Wubzy).send({file: "./database.sqlite"});
	} else if (msg.startsWith(prefix) && (cmd == "spawntreasure") && message.author.id === Wubzy) {
		message.delete();
		return spawnTreasure();
	} else if (!client.commands.has(cmd)) {client.commands.get("ar").execute(message, msg, args, cmd, prefix, mention, client);};
	try {
		if (msg.startsWith(prefix)) {
			if (client.commands.has(cmd)) {
				if (!(cmd == "say" || cmd == "slap" || cmd == "send")) {
					message.channel.startTyping();
					await wait(800);
					message.channel.stopTyping();
				};
				if ((!dmch && cmd == "theme") || (!dmch && cmd == "bj")) {return;};
				client.commands.get(cmd).execute(message, msg, args, cmd, prefix, mention, client);
			};
		} else if (msg.startsWith(adminPrefix)) {
			var args = message.content.slice(adminPrefix.length).trim().split(/ +/g);
			var cmd = args.shift().toLowerCase();
			message.channel.startTyping();
			await wait(500);
			message.channel.stopTyping();
			if (client.commands.has(cmd)) {client.commands.get(cmd).execute(message, msg, args, cmd, adminPrefix, mention, client);};
		}; 
	} catch (err) {
		console.error(err);
		message.reply("Really not sure what happened, but something you did (or something Wubzy sucks at doing) broke it. Please report this to WubzyGD#8766.")
		client.users.get(Wubzy).send("There was a fatal error in " + message.member.guild.name);
		client.users.get(Wubzy).send(err);
	};
	} catch (e) {console.log(e);};

	//enemy
	//story
	//char
	//quest
	//insult
	//scene
	//seduce
	//waifu
	//card games
	//raids
});