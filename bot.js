//bot.js dosyası

const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'x';

const money = {};
module.exports.money = money;

const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed()
    .setTitle('My Embed')
    .setDescription('This is an example of using MessageEmbed');

const { dailyMoney } = require('./commands/ekonomi/dailyMoney.js');
const showMoney = require('./commands/ekonomi/showMoney');
const giveMoney = require('./commands/ekonomi/giveMoney');
const giveUnlimitedMoney = require('./commands/ekonomi/giveUnlimitedMoney');
const { sellAnimal } = require('./commands/ekonomi/sellAnimal.js');

const { coinFlip } = require('./commands/kumar/coinFlip');
const playSlot = require('./commands/kumar/playSlot');

const { hunt } = require('./commands/oyun/hunt.js');
const { zoo } = require('./commands/data/zoo.js');
const animals = require('./commands/data/animals.js');

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!money[message.author.id]) {
   money[message.author.id] = 0;
 }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'daily') {
    dailyMoney(message, money);
  } else if (command === 'cash') {
    showMoney(message);
  } else if (command === 'give') {
    giveMoney(message, args);
  } else if (command === 'cf') {
    coinFlip(message, args);
  } else if (command === 's') {
    playSlot(message, args, money);
  } else if (command === 'giveunlimited') {
    giveUnlimitedMoney(message, args);
  } else if (command === 'h') {
    hunt(message, animals.animals);
  } else if (command === 'z') {
    zoo(message, animals.animals);
  }
  else if (command === 'sell') {
      sellAnimal(message, args, money, animals.animals);
  }
});

client.on('ready', () => {
  console.log('Bot başarıyla çalışıyor!');
});

client.login('TOKEN');
