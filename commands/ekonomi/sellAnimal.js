//sellAnimal.js dosyası

const { animals } = require('../data/animals.js');
const { money } = require('../../bot.js');
const { zoo } = require('../data/zoo.js');

function sellAnimal(message, args) {
  const animalId = parseInt(args[0]);
  const count = parseInt(args[1]) || 1;
  const userId = message.author.id;

  if (!message.client.zoo || !message.client.zoo[userId]) {
    return message.reply(`Hayvan bulunamadı. Lütfen doğru bir ID girin.`);
  }

  const animalData = message.client.zoo[userId][animalId];

  if (!animalData) {
    return message.reply(`Hayvan bulunamadı. Lütfen doğru bir ID girin.`);
  }

  const animal = {
    id: animalId,
    name: animalData.name,
    value: animalData.value,
    count: animalData.count
  };

  if (animal.count < count) {
    return message.reply(`Yeterli sayıda hayvanınız yok. Lütfen doğru bir sayı girin.`);
  }

  const value = animal.value * count;
  money[userId] += value;
  animal.count -= count;

  if (animal.count === 0) {
    delete message.client.zoo[userId][animalId];
  }

  zoo(message);
  module.exports.money = money;
  message.reply(`Tebrikler, ${count} adet ${animal.name} hayvanını başarıyla ${value} para karşılığında sattınız!`);
}

module.exports.sellAnimal = sellAnimal;
