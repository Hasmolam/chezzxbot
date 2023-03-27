//sellAnimal.js dosyası

const { animals } = require('../data/animals.js');
const { money } = require('../../bot.js');

function sellAnimal(message, args) {
  const id = parseInt(args[0]);
  const animal = animals.find(animal => animal.id === id);

  if (!animal) {
    return message.reply(`Hayvan bulunamadı. Lütfen doğru bir ID girin.`);
  }

  const value = animal.value;
  const userId = message.author.id;
  const userMoney = money[userId];

  money[userId] += value;
  animals.splice(animals.indexOf(animal), 1);
  module.exports.money = money;
  message.reply(`Tebrikler, ${animal.name} hayvanını başarıyla ${value} para karşılığında sattınız!`);
}

module.exports.sellAnimal = sellAnimal;
