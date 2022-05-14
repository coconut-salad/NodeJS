const { Telegraf } = require('telegraf');
const { default: axios } = require('axios');

const TOKEN = '5382523253:AAEzYm7LZHkseKG5flhaBawh56dYXZe1Bz8';

const bot = new Telegraf(TOKEN);
// /start /help
// bot.use((ctx, next) => {
//   ctx.reply('Inside middleware');
//   next();
// });

// bot.use((ctx) => {
//   ctx.reply('Inside middleware 2');
// });

bot.start((ctx) => {
  ctx.reply('Start message');
});

bot.help((ctx) => {
  ctx.reply('help\nline\nlin3');
});

bot.on('sticker', (ctx) => {
  ctx.reply('Bot received a stieker');
});

// bot.on('message', (ctx) => {
//   ctx.reply('bot recieved a message');
// });

// bot.hears(/hello/i, (ctx) => {
//   ctx.reply('hello user');
// });

bot.command('say', (ctx) => {
  ctx.reply('say command');
  // console.log(ctx.message.text);
  const words = ctx.message.text.split(' ');
  words.shift();
  console.log(words);
  const reply = words.join(' ');
  ctx.reply(reply);
});

bot.command('fortune', (ctx) => {
  const url = 'http://yerkee.com/api/fortune';
  axios
    .get(url)
    .then((result) => {
      ctx.reply(result.data.fortune);
    })
    .catch((e) => {
      ctx.reply('Some error occured');
    });
});

bot.command('inline', (ctx) => {
  console.log(ctx.chat.id);
  ctx.telegram.sendMessage(ctx.chat.id, 'Inline ketboard message', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Google', url: 'http://google.com' }],
        [
          { text: 'Facebook', url: 'http://fb.com' },
          { text: 'twitter', url: 'http://twitter.com' },
          { text: 'twitter', url: 'http://twitter.com' },
          { text: 'twitter', url: 'http://twitter.com' },
        ],
        [{ text: 'Google', url: 'http://google.com' }],
      ],
    },
  });
});

bot
  .launch()
  .then(() => {
    console.log('Bot started');
  })
  .catch((e) => {
    console.log(e);
  });
