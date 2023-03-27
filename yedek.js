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
