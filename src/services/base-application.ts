import { Message } from 'discord.js';

export class BaseApplication {
  event!: Message;

  constructor(event: Message) {
    this.event = event;
  }

  async sendErrorMessage(): Promise<void> {
    await this.event.reply(`tenho uma coisa chata pra te contar, deu não...`);
    await this.event.channel.send('https://tenor.com/view/tom-yjerry-tom-and-jerry-meme-sad-cry-gif-18054267');
  }
}
