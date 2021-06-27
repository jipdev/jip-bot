export interface Application {
  runCommand: (command: string) => Promise<void>;
}
