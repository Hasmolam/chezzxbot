const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'x';
const commands = {
  sa: sayHello,
  kral: sayKing,
  cash: showMoney,
  give: giveMoney,
  daily: dailyMoney,
  flip: coinFlip,
  cf: coinFlip,
  slot: playSlot,
  s:playSlot,
  giveunlimited:giveUnlimitedMoney
};



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

function playSlot(message, args) {
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
}

function sayHello(message) {
  message.channel.send('Merhaba!');
}

function sayKing(message) {
  message.channel.send('Buranın kralı Semih!');
}

let money = {}; // create an empty object to store the money of each user

const isCommand = message => message.content.startsWith(prefix) && !message.author.bot;

const getCommand = message => {
  const [command, ...args] = message.content.slice(prefix.length).trim().split(/ +/);
  return { command: command.toLowerCase(), args };
};


const executeCommand = (message, command, args) => {
  if (commands.hasOwnProperty(command)) {
    const commandValue = commands[command];
    if (typeof commandValue === 'function') {
      commandValue(message, args);
    } else {
      message.channel.send(`'${command}' adında bir komut yok`);
    }
  }
};

function showMoney(message) {
  const userId = message.author.id;
  const userMoney = money[userId] || 0; // if the user has no money yet, return 0
  message.channel.send(`Şuanda ${userMoney} kadar paran var.`);
}

function giveMoney(message, args) {
  const senderId = message.author.id;
  const recipientId = message.mentions.users.first()?.id;
  if (!recipientId) {
    message.channel.send(`Kullanıcı etiketleyin: \`xgiveadmin @username amount\``);
    return;
  }
  if (senderId === recipientId) {
    message.channel.send(`Kendinize para transferi yapamazsınız.`);
    return;
  }
  const amount = parseInt(args[1]);
  if (!amount || amount <= 0) {
    message.channel.send(`Geçersiz para miktarı. Lütfen pozitif bir sayı girin.`);
    return;
  }
  const senderMoney = money[senderId] || 0;
  if (senderMoney < amount) {
    message.channel.send(`Bu transferi yapmak için yeterli paranız yok.`);
    return;
  }
  money[senderId] -= amount;
  money[recipientId] = (money[recipientId] || 0) + amount;
  message.channel.send(`<@${senderId}> Başarılı bir şekilde <@${recipientId}> kullanıcısına ${amount} para gönderdi.`);
}


function dailyMoney(message) {
  const userId = message.author.id;
  const lastDaily = money[userId + '-daily'];
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
  money[userId] = (money[userId] || 0) + dailyAmount;
  money[userId + '-daily'] = new Date().getDate();
  message.channel.send(`Günlük ${dailyAmount} paranızı aldınız. Şu anda ${money[userId]} paranız var.`);
}

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



client.on('ready', () => {
  console.log(`${client.user.tag} sunucuya girdi!`);
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'şampiyon') {
    const yolcuhasan25ID = "847789464344068097";
    message.channel.send(`<@${yolcuhasan25ID}> sana ihtiyaçları var!`);
  }
});


client.on('message', message => {
  if (message.content.toLowerCase() === 'kral') {
    const ruzID = "789453680687972375";
    message.channel.send(`<@${ruzID}> kral seni çağırıyorlar!`);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'vezir') {
    const semihID = "1065710878449741876";
    message.channel.send(`<@${semihID}> kral seni çağırıyorlar!`);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'düşük elo') {
    const rumeysaID = "1025833959759818752";
    message.channel.send(`<@${rumeysaID}> düşük elo gel buraya!`);
  }
});

client.on('message', message => {
  if (message.content === 'VELET') {
    const rumeysaID = "1025833959759818752";
    message.channel.send(`<@${rumeysaID}> velet seni çağırıyorlar!`);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'leydi') {
    const rumeysaID = "1025833959759818752";
    message.channel.send(`<@${rumeysaID}> leydim siz olmadan yapamıyorlar!`);
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'lol') {
    const ahmetID = "515524117311520768";
    message.channel.send(`<@${ahmetID}> la lolden çıkta gel!`);
  }
});

client.on('message', message => {
  if (isCommand(message)) {
    const { command, args } = getCommand(message);
    executeCommand(message, command, args);
  }
});



client.login('MTA4Nzc4MDQwNTc4NjE4MTY2Mw.GeICCn.qlFxc6oeSGkLq--eQXD-OyG_kc-ZGtsEo8bFRw');
