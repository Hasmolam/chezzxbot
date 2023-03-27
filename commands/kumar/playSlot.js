const { MessageEmbed } = require('discord.js');

module.exports = function playSlot(message, args, money) {
  const userId = message.author.id;
  const betAmount = parseInt(args[0]); // parse the amount from the argument
  if (!betAmount || betAmount <= 0) {
    message.channel.send("Geçersiz bahis miktarı. Lütfen pozitif bir sayı girin.");
    return;
  }
  if (!money[userId] || money[userId] < betAmount) {
    message.channel.send("Bu bahisi yapmak için yeterli paranız yok.");
    return;
  }
  const emojis = ['🍎', '🍋', '🍇', '🍒'];
  const result = [
    emojis[Math.floor(Math.random() * emojis.length)],
    emojis[Math.floor(Math.random() * emojis.length)],
    emojis[Math.floor(Math.random() * emojis.length)]
  ];
  message.channel.send(`[  ] [  ] [  ]`).then((msg) => {
    const delay = 500;
    setTimeout(() => {
      msg.edit(`[${result[0]}] [  ] [  ]`);
    }, delay);
    setTimeout(() => {
      msg.edit(`[${result[0]}] [${result[1]}] [  ]`);
    }, delay * 2);
    setTimeout(() => {
      msg.edit(`[${result[0]}] [${result[1]}] [${result[2]}]`);
      if (result[0] === result[1] && result[0] === result[2]) {
        // user won
        const winnings = betAmount * 20;
        money[userId] += winnings;
        message.channel.send(`Tebrikler! ${winnings} para kazandınız. Şu anda ${money[userId]} paranız var.`);
      } else {
        // user lost
        money[userId] -= betAmount;
        message.channel.send(`Maalesef, ${betAmount} para kaybettiniz. Şu anda ${money[userId]} paranız var.`);
      }
    }, delay * 3);
  });
};
