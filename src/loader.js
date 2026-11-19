import { Collection } from 'discord.js';
import { readdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const archivos = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? archivos(join(dir, e.name)) : e.name.endsWith('.js') ? [join(dir, e.name)] : [],
  );

const importar = async (file) => (await import(pathToFileURL(file).href)).default;

/** Carga los comandos de src/commands/<categoria>/*.js */
export async function loadCommands() {
  const commands = new Collection();
  for (const file of archivos(fileURLToPath(new URL('./commands', import.meta.url)))) {
    const command = await importar(file);
    command.category = basename(dirname(file)); // la carpeta es la categoría
    commands.set(command.data.name, command);
  }
  return commands;
}

/** Registra los eventos de src/events/*.js */
export async function loadEvents(client) {
  for (const file of archivos(fileURLToPath(new URL('./events', import.meta.url)))) {
    const event = await importar(file);
    client[event.once ? 'once' : 'on'](event.name, (...args) => event.execute(...args));
  }
}
