import dotenv from 'dotenv';
import { JipBot } from './services/jip-bot';

dotenv.config();

const TOKEN = process.env.TOKEN as string;
new JipBot(TOKEN);
