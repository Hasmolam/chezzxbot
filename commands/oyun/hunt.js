//hunt.js dosyası

const { animals } = require('../data/animals.js');
const { money } = require('../../bot.js');
const { zoo } = require('../data/zoo.js');

const cooldowns = new Map();

function hunt(message) {
  if (cooldowns.has(message.author.id)) {
    const expirationTime = cooldowns.get(message.author.id) + 0010;
    if (Date.now() < expirationTime) {
      const timeLeft = (expirationTime - Date.now()) / 1000;
      return message.reply(`Biraz daha beklemelisin! Lütfen ${timeLeft.toFixed(1)} saniye sonra tekrar dene.`);
    }
  }

  const animalIds = Object.keys(animals);
  const sumOfChanges = animals.reduce((sum, animal) => sum + animal.change, 0);
  let randomValue = Math.random() * sumOfChanges;
  let randomId;
  for (let i = 0; i < animalIds.length; i++) {
    const animal = animals[animalIds[i]];
    randomValue -= animal.change;
    if (randomValue <= 0) {
     randomId = animalIds[i];
     break;
  }
}


  const animal = animals[randomId];
  const value = animal.value;

  
  if (animal.class === 'common') {
    message.reply(`Avlandın! ${animal.emoji} ${animal.name}.`);
  } else if (animal.class === 'rare') {
    message.reply(`İnanılmaz! ${animal.emoji} ${animal.name} avladın!`);
  } else if (animal.class === 'HABEŞ') {
    message.reply(`HABEŞ Mİ! ${animal.emoji} ${animal.name} avlandın!`);
  } else if (animal.class === 'legendary') {
    message.reply(`EFSANEVİ! ${animal.emoji} ${animal.name} avladın!`);
  } else if (animal.class === 'mythical') {
    message.reply(`DESTANSI! ${animal.emoji} ${animal.name} avlandın!`);
  } else if (animal.class === 'epic') {
    message.reply(`İNANILMAZ! ${animal.emoji} ${animal.name} avlandın!`);
  }
  

  if (!message.client.money) {
    message.client.money = {};
  }

  if (!message.client.money[message.author.id]) {
    message.client.money[message.author.id] = 0;
  }

  message.client.money[message.author.id] += value;

  if (!message.client.zoo) {
    message.client.zoo = {};
  }

  if (!message.client.zoo[message.author.id]) {
    message.client.zoo[message.author.id] = {};
  }

  if (!message.client.zoo[message.author.id][randomId]) {
    message.client.zoo[message.author.id][randomId] = {
      name: animal.name,
      value: animal.value,
      count: 1
    };
  } else {
    message.client.zoo[message.author.id][randomId].count++;
  }

  cooldowns.set(message.author.id, Date.now());
  setTimeout(() => cooldowns.delete(message.author.id), 5000);
}

module.exports.hunt = hunt;
