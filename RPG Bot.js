const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';

// Define player object
class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.attack = 10;
    this.defense = 5;
    this.gold = 0;
    this.inventory = [];
  }
}

// Create empty players object
const players = {};

// Handle messages
client.on('message', message => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Ignore messages without the prefix
  if (!message.content.startsWith(prefix)) return;

  // Get command and arguments
  const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);

  if (command === 'create') {
    // Check if player already exists
    if (players[message.author.id]) {
      message.reply('you already have a character!');
      return;
    }

    // Create new player
    const newPlayer = new Player(message.author.username);

    // Add player to players object
    players[message.author.id] = newPlayer;

    message.reply(`your character has been created!`);
  } else if (command === 'status') {
    // Get player
    const player = players[message.author.id];

    // Check if player exists
    if (!player) {
      message.reply('you don\'t have a character!');
      return;
    }
    else if (command === 'buy') {
  // Get player
  const player = players[message.author.id];

  // Check if player exists
  if (!player) {
    message.reply('you don\'t have a character!');
    return;
  }

  // Check if item is valid
  const item = args[0];
  if (item !== 'potion') {
    message.reply('that item is not available for purchase!');
    return;
  }

  // Check item cost
  const potionCost = 20;

  // Check if player has enough gold
  if (player.gold < potionCost) {
    message.reply(`you don't have enough gold to buy a potion! You need ${potionCost - player.gold} more gold.`);
    return;
  }

  // Deduct gold from player and add potion to inventory
  player.gold -= potionCost;
  player.inventory.push('Potion');

  message.reply(`you have bought a potion for ${potionCost} gold!`);
}


    // Send player status
    const embed = new Discord.MessageEmbed()
      .setTitle(player.name)
      .addField('Health', player.health)
      .addField('Attack', player.attack)
      .addField('Defense', player.defense)
      .addField('Gold', player.gold)
      .addField('Inventory', player.inventory.join('\n') || 'Empty')
      .setColor('BLUE');

    message.channel.send(embed);
  } else if (command === 'fight') {
    // Get player
    const currentPlayer = players[message.author.id];

    // Check if player exists
    if (!currentPlayer) {
      message.reply('you don\'t have a character!');
      return;
    }

    // Simulate fight
    const monster = {
      name: 'Goblin',
      health: 50,
      attack: 5,
      defense: 2,
      gold: 10,
      items: ['Potion']
    };

    let round = 1;

    while (currentPlayer.health > 0 && monster.health > 0) {
      // Player attacks monster
      const playerDamage = currentPlayer.attack - monster.defense;
      if (playerDamage > 0) {
        monster.health -= playerDamage;
        message.channel.send(`Round ${round}: ${currentPlayer.name} hits ${monster.name} for ${playerDamage} damage!`);
      } else {
        message.channel.send(`Round ${round}: ${currentPlayer.name} attacks ${monster.name} but does no damage...`);
      }

      // Check if monster died
      if (monster.health <= 0) {
        message.channel.send(`${monster.name} has been defeated! ${currentPlayer.name} gains ${monster.gold} gold and finds a ${monster.items[0]} in the monster's lair.`);
        currentPlayer.gold += monster.gold;
        currentPlayer.inventory.push(monster.items[0]);
        return;
      }

      // Monster attacks player
      const monsterDamage = monster.attack;
      currentPlayer.health -= monsterDamage;

      // Display attack results
      if (monsterDamage > 0) {
        message.channel.send(`Round ${round}: ${monster.name} hits ${currentPlayer.name} for ${monsterDamage} damage!`);
      } else {
        message.channel.send(`Round ${round}: ${monster.name} attacks ${currentPlayer.name} but does no damage...`);
      }

      // Check if player died
      if (currentPlayer.health <= 0) {
        message.channel.send(`${currentPlayer.name} has been defeated!`);
        return;
      }

      // Increment round
      round++;
    }


// Get player
const player = players[message.author.id];

    // Check if player exists
    if (!player) {
      message.reply('you don\'t have a character!');
      return;
    }

    // Check if player has items
    if (player.inventory.length === 0) {
      message.reply('you don\'t have any items!');
      return;
    }

    // Send player inventory
    const embed = new Discord.MessageEmbed()
      .setTitle(`${player.name}'s Inventory`)
      .setDescription(player.inventory.join('\n'))
      .setColor('BLUE');

    message.channel.send(embed);




    // Check if player has enough gold
    if (player.gold < potionCost) {
      message.reply(`you don't have enough gold to buy a potion! You need ${potionCost - player.gold} more gold.`);
      return;
    }

    // Deduct gold from player and add potion to inventory
    player.gold -= potionCost;
    player.inventory.push('Potion');

    message.reply(`you have bought a potion for ${potionCost} gold!`);
  }
  });


client.login('MTA4Nzc4MDQwNTc4NjE4MTY2Mw.GeICCn.qlFxc6oeSGkLq--eQXD-OyG_kc-ZGtsEo8bFRw');
