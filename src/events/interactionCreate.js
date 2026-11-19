import { Events, MessageFlags } from 'discord.js';

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error en /${interaction.commandName}:`, error);
      const msg = { content: 'Ocurrió un error ejecutando el comando.', flags: MessageFlags.Ephemeral };
      await (interaction.replied || interaction.deferred ? interaction.followUp(msg) : interaction.reply(msg));
    }
  },
};
