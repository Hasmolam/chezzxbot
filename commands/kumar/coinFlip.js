const { money } = require('../../bot.js');


const { MessageEmbed } = require('discord.js');


function coinFlip(message, args) {
  const userId = message.author.id;
  const betAmount = parseInt(args[0]); // parse the amount from the argument
  if (!betAmount || betAmount <= 0) {
    message.channel.send(`Geçersiz bahis miktarı. Lütfen pozitif bir sayı girin.`);
    return;
  }
  if (!money[userId] || money[userId] < betAmount) {
    message.channel.send(`Bu bahisi yapmak için yeterli paranız yok.`);
    return;
  }

  const random = Math.floor(Math.random() * 2); // generate a random number between 0 and 1
  const result = (random === 0) ? "yazı" : "tura";
  const winnings = (random === 0) ? -betAmount : betAmount;

  const embed = new MessageEmbed()
    .setTitle(`Yazı-Tura`)
    .setDescription(`Bahis miktarınız ${betAmount} idi ve para ${result} çıktığı için \n${Math.abs(winnings)} para ${winnings >= 0 ? "kazandınız" : "kaybettiniz"} .\nŞu anda ${money[userId] + winnings} paranız bulunmaktadır.`)
    .setColor(winnings >= 0 ? "#00ff00" : "#ff0000");
  message.channel.send(embed);

  money[userId] += winnings;
}

module.exports = { coinFlip, money };
