import fs from 'fs';
import {ParsedMessage} from "./parser";


export interface ChannelMessage extends ParsedMessage{
  message: string;
  date: number;
}


export class FakeDb {
  constructor() {
    fs.readFile('data/db.json', (err, json) => {
      const content = json.toString();

      this.messages = content ? JSON.parse(content) : this.messages;

    });


  }

  public messages: ChannelMessage[] = [];

  addMessage(msg: ChannelMessage) {
    this.messages.push(msg);
    this.write();
  }

  write() {
    fs.writeFile('data/db.json', JSON.stringify(this.messages), (err) => {
      if (err) {
        console.log('error', err)
      }
    })
  }



}

