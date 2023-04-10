import tgBot from 'node-telegram-bot-api';
import fs from 'fs';
import { FakeDb } from './fake-db';
import { parseMessage } from './parser';

const token = '6002392502:AAGKzB-s1qISNqWg-ThOoc7IEH2XrhJ_9Oo';
const bot = new tgBot(token, {
  polling: {
    params: {
      allowed_updates: ['channel_post']
    }
  }
});

const fakeDb = new FakeDb();


bot.on('channel_post', (content) => {
  // fakeDb.addMessage({
  //   message: content.text,
  //   date: content.date
  // })
  const parsed = parseMessage(content.text);

  console.log(parsed)
});



