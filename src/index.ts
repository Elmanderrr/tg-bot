import tgBot from 'node-telegram-bot-api';
import fs from 'fs';
import {FakeDb} from './fake-db';
import {parseMessage} from './parser';
import {groupBy} from "lodash";

const token = '6002392502:AAGKzB-s1qISNqWg-ThOoc7IEH2XrhJ_9Oo';
const bot = new tgBot(token,
  {polling: true});

const fakeDb = new FakeDb();


bot.on('channel_post', (content) => {

  const satisfyFormat = parseMessage(content.text);

  if (satisfyFormat) {
    fakeDb.addMessage({
      message: content.text,
      date: content.date,
      profit: satisfyFormat.profit,
      token: satisfyFormat.token,
      type: satisfyFormat.type
    })
  }
  if (content.entities?.[0].type === "bot_command" && content.text === '/report') {
    const groupped = groupBy(fakeDb.messages, 'token');
    const message = Object.entries(groupped).map(([token, data]) => {
      const out = data.find(m => m.type === 'out');
      return `${token} : ${out.profit}%`
    });

    if (message?.length) {
      const total = 'Total: ' + fakeDb.messages.map(v => v.profit).reduce((a, b) => a + b) + ' %';
      bot.sendMessage(content.chat.id, [...message, total].join('\n'));

    }
  }

});



