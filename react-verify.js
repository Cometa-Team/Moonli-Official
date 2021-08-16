#!/usr/bin/env node
"use strict";

const { Discord, Intents, Collection } = require('discord.js');
const chalk = require("chalk");
const moment = require("moment");
const { BOT_TOKEN, VERIFICATION_CHANNEL, VERIFIED_ROLE } = require("./config.json");

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
  disableEveryone: true
});

client.once("ready", () => {
  console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, hh:mm:ss")}`);
});

client.on("messageCreate", message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.content === "agree" && message.channel.id === VERIFICATION_CHANNEL) {
    if (!message.channel.permissionsFor(message.guild.me).serialize().SEND_MESSAGES) return console.error("The bot doesn't have the permission to send messages.\nRequired permission: SEND_MESSAGES");
    if (!message.channel.permissionsFor(message.guild.me).serialize().ADD_REACTIONS) {
      console.error("The bot doesn't have the permission to add reactions.\nRequired permission: `ADD_REACTIONS`");
      message.channel.send({ content: "У бота нет разрешения на добавление реакций. \ NТребуемое право: `ADD_REACTIONS`" })
        .then(m => m.delete({timeout: 20000}));
      return;
    }
    if (!message.channel.permissionsFor(message.guild.me).serialize().MANAGE_MESSAGES) {
      console.error("The bot doesn't have the permission to delete messages.\nRequired permission: `MANAGE_MESSAGES`");
      message.channel.send({ content: "The bot doesn't have the permission to delete messages.\nRequired permission: `MANAGE_MESSAGES`" })
        .then(m => m.delete({timeout: 20000}));
      return;
    }
    const messageRole = message.guild.roles.cache.find(role => role.name === VERIFIED_ROLE);
    if (messageRole == null) return;
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      message.channel.send({ content: "The bot doesn't have the permission required to assign roles.\nRequired permission: `MANAGE_ROLES`" })
        .then(m => m.delete({timeout: 20000}));
      return;
    }
    if (message.guild.me.roles.highest.comparePositionTo(messageRole) < 1) {
      message.channel.send({ content: "The position of this role is higher than the bot's highest role, it cannot be assigned by the bot." })
        .then(m => m.delete({timeout: 20000}));
      return;
    }
    if (messageRole.managed == true) {
      message.channel.send({ content: "This is an auto managed role, it cannot be assigned." })
        .then(m => m.delete({timeout: 20000}));
      return;
    }
    if (message.member.roles.cache.has(messageRole.id)) return;
    message.react("✅");
    message.member.roles.add(messageRole)
      .then(() => message.delete({ timeout:5000 }))
      .catch(error => {
      console.error(error.stack);
      message.channel.send(error.stack)
        .then(m => m.delete({timeout: 20000}));
    });
  }
});

client.login(BOT_TOKEN);
