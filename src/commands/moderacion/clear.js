import { InteractionContextType, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Borra mensajes del canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setContexts(InteractionContextType.Guild)
    .addIntegerOption((o) =>
      o.setName('cantidad').setDescription('Cuántos mensajes borrar (1-100)').setRequired(true).setMinValue(1).setMaxValue(100),
    ),

  async execute(interaction) {
    const cantidad = interaction.options.getInteger('cantidad');
    const borrados = await interaction.channel.bulkDelete(cantidad, true);

    await interaction.reply({
      content: `🧹 Borré ${borrados.size} mensaje(s). Los de más de 14 días no se pueden borrar así.`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
