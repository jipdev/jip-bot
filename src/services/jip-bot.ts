import discord, { Client, Message } from 'discord.js';
import { acceptedApplications } from '../constant/accepted-applications';
import { botName } from '../constant/bot-name';
import { Applications } from '../enums/applications';
import { getCommands } from '../utils/commands';
import { applicationNotFound, getRandomMessageWhenDontHasCommand } from '../utils/messages';
import { HelpApplication } from './help-application';
import { NlwApplication } from './nlw-application';

export class JipBot {
  client!: Client;
  event!: Message;

  constructor(TOKEN: string) {
    this.client = new discord.Client();
    this.listenMessages();
    this.client.login(TOKEN);
  }

  listenMessages(): void {
    this.client.on('ready', () => this.client.user?.setStatus('online'));

    this.client.on('message', async (event: Message) => {
      if (event.content.startsWith(botName)) {
        this.event = event;
        await this.readCommand(this.getCommand(event.content));
      }
    });
  }

  isAcceptedApplication(command: string): boolean {
    return acceptedApplications.includes(command.split(' ')[0]);
  }

  getCommand(text: string): string {
    return text.split(botName)[1].trim();
  }

  async readCommand(command: string): Promise<void> {
    if (!command.length) {
      await this.event.reply(getRandomMessageWhenDontHasCommand());
      return;
    }

    if (this.isAcceptedApplication(command)) {
      await this.useApplication(command);
    } else {
      await this.event.reply(applicationNotFound);
    }
  }

  async useApplication(command: string): Promise<void> {
    const { actual, next } = getCommands(command);
    switch (actual) {
      case Applications.nlw:
        await new NlwApplication(this.event).runCommand(next);
        break;
      case Applications.help:
        await new HelpApplication(this.event).runCommand(next);
        break;
      default:
        await this.event.reply(applicationNotFound);
    }
  }
}
