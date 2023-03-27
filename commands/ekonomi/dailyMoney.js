//dailyMoney.js dosyası

function dailyMoney(message, money) {
  const userId = message.author.id;
  const lastDaily = money && money.hasOwnProperty(userId + '-daily') ? money[userId + '-daily'] : null;

  if (lastDaily && lastDaily === new Date().getDate()) {
    const resetTime = new Date();
    resetTime.setHours(10, 0, 0, 0);
    if (resetTime < new Date()) {
      resetTime.setDate(resetTime.getDate() + 1);
    }
    const remainingTimeSeconds = Math.floor((resetTime.getTime() - new Date().getTime()) / 1000);
    const remainingHours = Math.floor(remainingTimeSeconds / 3600);
    const remainingMinutes = Math.floor((remainingTimeSeconds % 3600) / 60);
    const remainingSeconds = remainingTimeSeconds % 60;
    message.channel.send(`Günlük paranızı zaten aldınız! Lütfen tekrar talep etmeden önce ${remainingHours} saat, ${remainingMinutes} dakika ve ${remainingSeconds} saniye bekleyin.`);
    return;
  }
  const dailyAmount = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
  money = money || {};
  money[userId] = (money[userId] ? money[userId] : 0) + dailyAmount;
  money[userId + '-daily'] = new Date().getDate();
  message.channel.send(`Günlük ${dailyAmount} paranızı aldınız. Şu anda ${money[userId]} paranız var.`);
}

module.exports = { dailyMoney };
