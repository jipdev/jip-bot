import axios from 'axios';
import { Message } from 'discord.js';
import { NlwApplicationCommands } from '../enums/nlw-application-commands';
import { NlwParams } from '../enums/nlw-params';
import { Application } from '../interfaces/application';
import { getCommands, getParam } from '../utils/commands';
import { commandListMessage, commandNotFound } from '../utils/messages';
import { BaseApplication } from './base-application';

export class NlwApplication extends BaseApplication implements Application {
  constructor(event: Message) {
    super(event);
  }

  async runCommand(command: string): Promise<void> {
    const { actual, next } = getCommands(command);
    switch (actual) {
      case NlwApplicationCommands.search:
        await this.searchClass(next);
        break;
      case NlwApplicationCommands.help:
        await this.helpCommand();
        break;
      default:
        await this.event.reply(commandNotFound('nlw help'));
    }
  }

  async helpCommand(): Promise<void> {
    await this.event.reply(
      `então parceiro, o que tenho disponível ta ai em baixo!
      **buscar**: para buscar a url da aula.`,
    );
  }

  async searchClass(command: string): Promise<void> {
    let url;
    const { actual, next } = getCommands(command);
    switch (actual) {
      case NlwApplicationCommands.help:
        await this.helpSearchCommand(next);
        break;
      default:
        try {
          url = await this.getClassUrl(command);
          if (url?.length) {
            await this.event.reply(`pega essa bagaça ai \r\n\`${url.join('\r\n')}\``);
          } else {
            await this.sendErrorMessage();
          }
        } catch (e) {
          await this.sendErrorMessage();
        }
    }
  }

  async helpSearchCommand(command: string): Promise<void> {
    switch (command.trim()) {
      case NlwApplicationCommands.classes:
        await this.event.reply(
          `as aulas que eu tenho no momento são essas: \`[react, reactnative, flutter, node, elixir]\``,
        );
        break;
      case NlwApplicationCommands.example:
        await this.event.reply(
          `pra essa bagaça funcionar certinho eu preciso que vc preencha parecido com o de baixo: \r\n\`jip nlw buscar edicao=1 curso=reactnative aula=1\`\r\nporém caso queria a aula de todos os cursos, omita o parâmetro curso`,
        );
        break;
      default:
        await this.event.reply(
          commandListMessage(
            `**aulas**: lista as aulas disponíveis.\r\n**exemplo**: exibe um exemplo para você seguir.`,
          ),
        );
    }
  }

  async getClassUrl(command: string): Promise<string[]> {
    try {
      await this.event.reply('guenta ai que o papai ta on fire!');
      const edition = getParam(NlwParams.edition, command);
      const lesson = getParam(NlwParams.lesson, command);
      const day = getParam(NlwParams.day, command);
      const onlyOneClass = lesson.length;
      const response = await axios.get(
        onlyOneClass ? `/nlw/${edition}/${lesson}/${day}/` : `/nlw/${edition}/day-${day}`,
        {
          baseURL: process.env.NLW_BOT_URL,
        },
      );

      return response.data;
    } catch (e) {
      return [''];
    }
  }
}
