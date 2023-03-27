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
  const randomId = animalIds[Math.floor(Math.random() * animalIds.length)];

  const animal = animals[randomId];
  const value = animal.value;

  message.reply(`Avlandın! ${animal.emoji} ${animal.name} seni ${value} para kazandırdı!`);

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
