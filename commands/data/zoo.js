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

      animalList += `${animal.emoji} **${animal.name}** [${animalId}] x${animalData.count}\n`;
    });
  }

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${message.author.username}'in Hayvanat Bahçesi`)
    .setDescription(animalList);

  message.channel.send(embed);
}

module.exports.zoo = zoo;
