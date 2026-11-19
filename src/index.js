import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config.js';
import { loadCommands, loadEvents } from './loader.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = await loadCommands();
await loadEvents(client);

await client.login(config.token);
