const Discord = require('discord.js')

const client = new Discord.Client();
let queue = [];
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '!q') {
        let channel = (msg.guild.channels.cache.find(role => role.name === "Office Hours"));
        if (channel.members.size < channel.userLimit) {
            msg.member.voice.setChannel((msg.guild.channels.cache.find(role => role.name === "Office Hours")).id);
        } else if (!queue.includes(msg.member.user.id)) {
                queue.push(msg.member.user.id);
            }
    }
    if (msg.content === '!n') {
        let channel = (msg.guild.channels.cache.find(role => role.name === "Office Hours"));
        let roleID = (msg.guild.roles.cache.find(role => role.name === "TA").id);
        if (msg.member.roles.cache.has(roleID) && queue.length != 0 && channel.members.size < channel.userLimit) {
            let user = queue.pop();
            msg.guild.members.cache.get(user).voice.setChannel(channel.id);
        }
    }
});

client.login("BotTokenHere");