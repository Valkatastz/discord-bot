const Discord = require('discord.js');
const config = require('./config.json');
//Initialize Discord Bot
const client = new Discord.Client({
  token: config.token,
  prefix: config.prefix,
  autorun:true
});
client.on("ready", function (exe) {
  console.log(`${client.user.username} is connected`);
  console.log(`logged in as: ${client.user.username}`);
  console.log(client.user.setActivity("Coding Exerax Official"));
});
client.on("message", function (message) {
  if (message.author == client.user) {
    return
}
if (message.content.startsWith(config.prefix)) {
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
  url: "Website Coming Soon",
  description: "User guidelines, Rules, Laws & legimiate information",
  fields: [{
    name: "Rules",
    value: "You can access the rules on: https://bit.ly/egn-rules"
  },
  {
    name: "Law Handbook",
    value: "The Law handbook is not mandatory but optional. It can be found on: coming soon"
  },
  {
    name: "LAPD Academy",
    value: "To apply for being part of the LAPD force: coming soon"
  },
  {
    name: "LAFD Academy",
    value: "To apply for being part of the LAFD, work as a paramedic/nurse/doctor etc: coming soon"
  }
],
timestamp: new Date(),
footer: {
  icon_url: client.user.avatarURL,
  text: "© Exerax Official"
}
}})
};

client.on('message', async message => {
  if (message.author.bot) returnl;
  if (message.content.toLowerCase() == '!verify' && message.channel.id === '578288248116477962')
  {
    const role = message.guild.roles.cache.get('579055846718308353');
    if (role) {
      try {
        await message.member.roles.add(role);
        console.log('Role Added');
      }
      catch (err) {
        console.log(err);
      }
    }
  }
})
client.login(config.token);
