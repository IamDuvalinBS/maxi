import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { loadCommands } from './loader.js';

const commands = (await loadCommands()).map((c) => c.data.toJSON());

const route = config.guildId
  ? Routes.applicationGuildCommands(config.clientId, config.guildId)
  : Routes.applicationCommands(config.clientId);

await new REST().setToken(config.token).put(route, { body: commands });
console.log(`${commands.length} comando(s) registrado(s)`);
