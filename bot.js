const Discord = require('discord.js');
const config = require('./config.json');
const info = require('./info.json');
const rules = require('./rules.json');
const appli = require('./application.json');
//Initialize Discord Bot
const client = new Discord.Client({
  token: config.token,
  prefix: config.prefix,
  autorun:true
});
client.on("ready", function (exe) {
  console.log(`${client.user.username} is connected`);
  console.log(`logged in as: ${client.user.username}`);
  console.log(client.user.setActivity("Coding X Gaming RP"));
});
client.on("message", function (message) {
  if (message.author == client.user) {
    return
}
if (message.content.startsWith(config.prefix)) {
  processCommand(message)
}});

//Function for command handler.
function processCommand(message) {
    let fullCommand = message.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    //Define the help command
    if (primaryCommand == "help") {
        helpCommand(arguments, message) // Get the function for the help command
    }
    if (primaryCommand == "rules") {
      rulesCommand(arguments, message)
    }
    if (primaryCommand == "appli") {
      appliCommand(arguments, message)
    }
};

// On user joining the server assign Civilian role
client.on('guildMemberAdd',function(member) {
  const mem = member.guild.member(member.id) // Get the user id lately used for logging to log their ID.
  console.log(mem + ' has joined the community.'); // < print a console message on user joining.

  // Get the specified role
  var role = member.guild.roles.get(config.roleid);
  // Add the role
  if(member.guild.roles.has(role)){
    console.log("The member is a Civilian."); //< mostly never will be used but just for security checks to avoid overlaying and mistmatch do the check first.
  }
  else {
    member.addRole(role);
    console.log(mem + ' has been granted with a role of Civilian.');
  }
});

//Help command handler
function helpCommand(arguments, message) {
  let hEmbed = new Discord.RichEmbed() // declare the RichEmbed message function
  .setColor(3447003) // set the color (light blue)
  .setTitle("Server Information") // Title
  .setAuthor(message.guild.name, message.guild.iconURL) // author icon and the name of it
  .setDescription(info.description) // description
  .addField(info.fowner, info.owners, true) // delcare the field and text for owner
  .addField(info.frules, info.rules, true) // decalare the field and text for rules
  .addField(info.flaw, info.handbook, true) // declare the field and text for law handbook 
  .addField(info.flspd, info.lspdacademy, true) // declare the field and text for lapd academy
  .addField(info.fems, info.emsacademy, true) // declare the field and text for lafd academy
  .addField(info.fdispatch, info.dispatch, true) // declare the field and text for dispatch
  .addField(info.frealtor, info.realtor, true) // declare the field and text for realtor
  .addField(info.fmembers, info.members + `**${message.guild.memberCount}**`, true) // decalre the field and text for members in bold
  .addField(info.fjobs, info.roles + `**${message.guild.roles.size}**`, true) // declare the field and text for number of jobs in bold
  .setFooter(`${config.copyrights} • ${config.version}`, client.user.displayAvatarURL) // declare the copyrights, version of the bot and diplay the avatar in the footer
  .setTimestamp(client.Date) // display the date in the footer
  .setThumbnail(`${client.user.displayAvatarURL}`) // set the thumbnail in the right hand side
  .setImage(info.banner) // add a banner
  message.channel.send({embed: hEmbed}); // display the embedded message
};

function rulesCommand(arguments, message) {
  let hEmbed = new Discord.RichEmbed() // declare the RichEmbed message function
  .setColor(3447003) // set the color (light blue)
  .setTitle("X Gaming Community Rules") // Title
  .setAuthor(message.guild.name, message.guild.iconURL) // author icon and the name of it
  .setDescription(rules.description) // description
  .addField(rules.frdm, rules.rdm, true) // delcare the field and text for owner
  .addField(rules.fvdm, rules.vdm, true) // decalare the field and text for rules
  .addField(rules.finsd, rules.InsultingDiscord, true) // declare the field and text for law handbook 
  .addField(rules.finsg, rules.InsultingInGame, true) // declare the field and text for lapd academy
  .addField(rules.ffe, rules.ForbiddenEquipment, true) // declare the field and text for lafd academy
  .addField(rules.fmbaa, rules.mbair, true) // declare the field and text for dispatch
  .addField(rules.fresp, rules.respect, true) // declare the field and text for realtor
  .addField(rules.fhumour, rules.humour, true) // declare the field and test for humour
  .addField(rules.fchannels, rules.channels, true) // declare the field and test for channels
  .setFooter(`${config.copyrights} • ${config.version}`, client.user.displayAvatarURL) // declare the copyrights, version of the bot and diplay the avatar in the footer
  .setTimestamp(client.Date) // display the date in the footer
  .setThumbnail(`${client.user.displayAvatarURL}`) // set the thumbnail in the right hand side
  .setImage(rules.banner) // add a banner
  message.channel.send({embed: hEmbed}); // display the embedded message
};

function appliCommand(arguments, message) {
  let hEmbed = new Discord.RichEmbed() // declare the RichEmbed message function
  .setColor(3447003) // set the color (light blue)
  .setTitle("X Gaming Community Job Application") // Title
  .setAuthor(message.guild.name, message.guild.iconURL) // author icon and the name of it
  .setDescription(appli.description) // description
  .addField(appli.fdep, appli.dep, true) // delcare the field and text for owner
  .addField(appli.ffirstname, appli.firstname, true) // decalare the field and text for rules
  .addField(appli.flastname, appli.lastname, true) // declare the field and text for law handbook 
  .addField(appli.fdob, appli.DateofBirth, true) // declare the field and text for lapd academy
  .addField(appli.fpe, appli.PreviousExperience, true) // declare the field and text for lafd academy
  .addField(appli.freason, appli.Reason, true) // declare the field and text for dispatch
  .addField(appli.fmw, appli.mirandawarning, true) // declare the field and text for realtor
  .addField(appli.freq, appli.requirements, true) // declare the field and text for requirements
  .addField(appli.fagree, appli.agreement, true) // declare the field and text for agreement
  .setFooter(`${config.copyrights} • ${config.version}`, client.user.displayAvatarURL) // declare the copyrights, version of the bot and diplay the avatar in the footer
  .setTimestamp(client.Date) // display the date in the footer
  .setThumbnail(`${client.user.displayAvatarURL}`) // set the thumbnail in the right hand side
  .setImage(rules.banner) // add a banner
  message.channel.send({embed: hEmbed}); // display the embedded message
};

client.login(config.token);
