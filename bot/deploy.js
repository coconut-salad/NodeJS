const { Telegraf } = require('telegraf');
const { default: axios } = require('axios');
const express = require('express');

const TOKEN = '5338574521:AAFm2Rz7ItLSF1d4hoi9eheM9bu0ptGbDVA';

const bot = new Telegraf(TOKEN);
const app = express();

// /start /help

// bot.use((ctx, next) => {
//   ctx.reply('Inside middleware');
//   next();
// });

// bot.use((ctx, next) => {
//   ctx.reply('Inside middleware 2').then(() => {
//     next();
//   });
// });

const userData = [];

bot.use((ctx, next) => {
  userData.push(ctx.chat);
  next();
});

bot.start((ctx, next) => {
  ctx.reply('Start message');
  next();
});

bot.command('getallusers', (ctx) => {
  if (ctx.chat.id === 768772939) {
    ctx.reply(JSON.stringify(userData));
  } else {
    ctx.reply('This command is not for you');
  }
});

bot.start((ctx) => {
  ctx.reply('inside start 2');
});

bot.help((ctx) => {
  ctx.reply('help\n\n\n\nline\nlin3');
});

bot.on('document', (ctx) => {
  console.log(ctx.update.message.document);
  ctx.reply('Bot received a stieker');
});

// bot.on('message', (ctx) => {
//   ctx.reply('bot recieved a message');
// });
//

bot.on('inline_query', (ctx) => {
  console.log(ctx.inlineQuery.query);
  const query = ctx.inlineQuery.query;
  console.log(query);
  const url = 'http://www.omdbapi.com/?apikey=88447f28&s=' + query;
  if (query.length > 3) {
    axios
      .get(url)
      .then((result) => {
        const searchResults = result.data.Search;
        const replyArray = searchResults.map((x, i) => {
          return {
            type: 'photo',
            id: i,
            photo_url:
              x.Poster === 'N/A'
                ? 'https://image.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg'
                : x.Poster,
            thumb_url:
              x.Poster === 'N/A'
                ? 'https://image.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg'
                : x.Poster,
            caption:
              x.Title +
              ' @ ' +
              x.Year +
              '\n\n' +
              'https://www.imdb.com/title/' +
              x.imdbID +
              '/',
          };
        });

        ctx.answerInlineQuery(replyArray);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});

bot.hears(/h[ea]llo/i, (ctx) => {
  ctx.reply('hello user');
});

bot.command('say', (ctx) => {
  ctx.reply('say command');
  console.log(ctx.message.text);
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

/*  {
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
  }*/

bot.command('inline', (ctx) => {
  console.log(ctx.chat.id);
  ctx.telegram.sendMessage(ctx.chat.id, 'Inline ketboard message', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'a', url: 'google.com' }],
        [
          { text: 'df', url: 'aesfs.com' },
          { text: 'sdfsgfs', url: 'sdgd.com' },
        ],
        [{ text: 'Custom Action', callback_data: 'clickCustomActionButton' }],
      ],
    },
  });
});

bot.action('clickCustomActionButton', (ctx) => {
  ctx.deleteMessage();
  ctx.reply('custom action button clicked');
});

bot.command('inline2', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, 'Inline menu message', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Button1', callback_data: 'one' }],
        [{ text: 'Button2', callback_data: 'two' }],
      ],
    },
  });
});

bot.action('one', (ctx) => {
  ctx.deleteMessage().then(() => {
    ctx.telegram.sendMessage(ctx.chat.id, 'one button', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Back', callback_data: 'back' }]],
      },
    });
  });
});

bot.action('two', (ctx) => {
  ctx.deleteMessage().then(() => {
    ctx.telegram.sendMessage(ctx.chat.id, 'two button', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Back', callback_data: 'back' }]],
      },
    });
  });
});

bot.action('back', (ctx) => {
  ctx.deleteMessage().then(() => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Inline menu message', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Button1', callback_data: 'one' }],
          [{ text: 'Button2', callback_data: 'two' }],
        ],
      },
    });
  });
});

bot.command('image', (ctx) => {
  // ctx.telegram.sendPhoto(ctx.chat.id,);
  ctx.replyWithPhoto(
    'https://image.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg'
  );
});

bot.command('/local', (ctx) => {
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
  ctx.telegram.sendAnimation(
    ctx.chat.id,
    { source: './sammple.jpg', filename: 'RITUPARNA' },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

bot.command('/mediagroup', (ctx) => {
  ctx.telegram.sendMediaGroup(ctx.chat.id, [
    { type: 'photo', media: { source: './sammple.jpg' } },
    { type: 'photo', media: { source: './sammple.jpg' } },
    { type: 'photo', media: { source: './sammple.jpg' } },
    {
      type: 'photo',
      media: {
        url: 'https://image.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg',
      },
    },
    {
      type: 'photo',
      media: {
        url: 'https://image.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg',
      },
    },
  ]);
});

app.use(bot.webhookCallback('/' + TOKEN));

app.listen(process.env.PORT);

bot.telegram.setWebhook(
  'https://sheltered-hamlet-68641.herokuapp.com/' + TOKEN
);
// .launch()
// .then(() => {
//   console.log('Bot started');
// })
// .catch((e) => {
//   console.log(e);
// });
