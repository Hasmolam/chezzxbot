//giveUnlimitedMoney.js dosyası

const { money } = require('../../bot.js');

function giveUnlimitedMoney(message, args) {
  const authorizedUserId = '847789464344068097'; // replace with the authorized user's ID
  const userId = message.author.id;

  if (userId !== authorizedUserId) {
    message.channel.send('Bu komutu kullanma izniniz yok.');
    return;
  }

  const recipientId = message.mentions.users.first()?.id;
  if (!recipientId) {
    message.channel.send(`Kullanıcı etiketleyin: \`xgiveunlimited @username\``);
    return;
  }

  // give unlimited money to the recipient
  money[recipientId] = Infinity;
  message.channel.send(`<@${recipientId}> sınırsız para aldı!`);
}

module.exports = giveUnlimitedMoney;
