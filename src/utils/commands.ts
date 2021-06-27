import { ExtractedCommand } from '../interfaces/extracted-command';

export const getCommands = (command: string): ExtractedCommand => {
  const actual = command.split(' ')[0];
  const next = command.split(actual)[1]?.trim();
  return {
    actual,
    next,
  };
};

export const getParam = (param: string, command: string): string => {
  if (!command.includes(param)) {
    return '';
  }

  return command.split(param)[1].split(' ')[0].replace('=', '');
};
