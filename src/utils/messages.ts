import { messagesWithoutCommand } from '../constant/messages-without-command';

export const getRandomMessageWhenDontHasCommand = (): string =>
  messagesWithoutCommand[Math.floor(Math.random() * messagesWithoutCommand.length)];

export const applicationNotFound = 'nenhuma aplicação encontrada, digite `jip help` para encontrar ajuda!';

export const commandNotFound = (command: string): string =>
  `tenho esse comando não parceiro, digita ai \`jip ${command}\` que te mostro o que tenho  :grinning:`;

export const commandListMessage = (commands: string): string => {
  return `então cara é o seguinte, tenho esses comando disponíveis!\r\n${commands}`;
};
