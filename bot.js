const Discord = require('discord.js');
const config = require('./config.json');
const info = require('./info.json');
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

// On user joining the server assign Civilian role
client.on('guildMemberAdd',function(member) {
  const mem = member.guild.member(member.id)
  console.log(mem + 'has joined the community.'); // < print a console message on user joining.

  // Get the specified role
  var role = member.guild.roles.get("579055846718308353");
  // Add the role
  if(member.guild.roles.has(role)){
    console.log("The member is a Civilian.");
  }
  else {
    member.addRole(role);
    console.log(mem + 'has been granted with a role of Civilian.');
  }
});

function helpCommand(arguments, message) {
  let hEmbed = new Discord.RichEmbed()
  .setColor(3447003)
  .setTitle("Server Information")
  .setAuthor(`${message.guild.name}`, message.guild.iconURL)
  .setDescription(info.description)
  .addField("**Owner**", `${info.owners + message.guild.owner}`, true)
  .addField("**Rules**", `${info.rules}`, true)
  .addField("**Law Handbook**", `${info.handbook}`, true)
  .addField("**LAPD Academy**", `${info.lapdacademy}`, true)
  .addField("**LAFD Academy**", `${info.lafdacademy}`, true)
  .addField("**Dispatch**", `${info.dispatch}`, true)
  .addField("**Realtor**", `${info.realtor}`, true)
  .addField("**Members**", `${info.members + `**${message.guild.memberCount}**`}`, true)
  .addField("**Jobs**", `${info.roles + `**${message.guild.roles.size}**`}`, true)
  .setFooter(`${config.copyrights} • ${config.version}`, client.user.displayAvatarURL)
  .setTimestamp(client.Date)
  .setThumbnail(`${client.user.displayAvatarURL}`);
  message.channel.send({embed: hEmbed});
};
client.login(config.token);
