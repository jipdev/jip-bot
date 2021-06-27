import { Message } from 'discord.js';
import { HelpApplicationCommands } from '../enums/help-application-commands';
import { Application } from '../interfaces/application';
import { commandListMessage } from '../utils/messages';

export class HelpApplication implements Application {
  event!: Message;

  constructor(event: Message) {
    this.event = event;
  }

  async runCommand(command: string): Promise<void> {
    switch (command.trim()) {
      case HelpApplicationCommands.list:
        await this.event.reply(`atualmente possuo apenas essas aplicações: \`[nlw, help]\``);
        break;
      default:
        await this.event.reply(
          commandListMessage(`
          **list**: Lista as aplicações disponíveis
          `),
        );
    }
  }
}
