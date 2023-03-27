//zoo.js dosyası

const { MessageEmbed } = require('discord.js');
const { animals } = require('./animals.js');
const { money } = require('../../bot.js');

function zoo(message) {
  if (!message.client.zoo) {
    message.client.zoo = {};
  }

  if (!message.client.zoo[message.author.id]) {
    message.client.zoo[message.author.id] = {};
  }

  let animalList = "";
  const animalIds = Object.keys(message.client.zoo[message.author.id] ?? {});

  if (!animalIds.length) {
    animalList = "Henüz bir hayvanın yok. Avlanmaya çık ve hayvanlarını topla!";
  } else {
    animalIds.forEach((animalId) => {
      const animalData = message.client.zoo[message.author.id][animalId];
      const animal = animals.find((a) => a.id === parseInt(animalId));

      if (!animal) {
        console.error(`Animal with ID ${animalId} not found in "animals" object`);
        return;
      }

      animalList += `${animal.emoji} ${animal.name}\nId: ${animalId}\nAdet: ${animalData.count}\nDeğer: ${animalData.value} 💰\n\n`;
    });
  }

  message.channel.send(`**${message.author.username}'in hayvanat bahçesi:**\n\n${animalList}`);
}

module.exports.zoo = zoo;
