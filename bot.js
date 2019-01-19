const Discord = require('discord.js');
const command = require('discord.js-commando');
const config = require('./config.json');
const logger = require('winston');
//Logger Settings Configured
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';
//Initialize Discord Bot
const client = new Discord.Client({
  token: config.token,
  prefix: config.prefix,
  autorun:true
});
client.on("ready", function (exe) {
  logger.info(`${client.user.username} is connected`);
  logger.info(`logged in as: ${client.user.username}`);
  logger.info(client.user.setActivity("Coding Exerax Official"));
});
client.on("message", function (message) {
  if (message.author == client.user) {
    return
}
if (message.content.startsWith("!")) {
  processCommand(message)
}});

function processCommand(message) {
    let fullCommand = message.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, message)
    }
};

function helpCommand(arguments, message) {
  message.channel.send({embed: {
  color: 3447003,
  author: {
    name: client.user.username,
    icon_url: client.user.avatarURL
  },
  title: "User guidelines",
  url: "https://club.exerax.com/",
  description: "User guidelines, Rules, Laws & legimiate information",
  fields: [{
    name: "Rules",
    value: "You can access the rules on: http://bit.ly/exerax-rules"
  },
  {
    name: "Law Handbook",
    value: "The Law handbook is not mandatory but optional. It can be found on: http://bit.ly/exerax-law"
  },
  {
    name: "MET Police Academy",
    value: "To apply for being part of the MET Police force: http://bit.ly/met-academy"
  },
  {
    name: "NHS Academy",
    value: "To apply for being part of the NHS, work as a paramedic/nurse/doctor etc: http://bit.ly/nhs-apply"
  }
],
timestamp: new Date(),
footer: {
  icon_url: client.user.avatarURL,
  text: "© Exerax Official"
}
}})
};
client.login(config.token);
