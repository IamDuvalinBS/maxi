import { EmbedBuilder, InteractionContextType, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Muestra información del servidor')
    .setContexts(InteractionContextType.Guild),

  async execute(interaction) {
    const { guild } = interaction;

    const embed = new EmbedBuilder()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL())
      .setColor(0x5865f2)
      .addFields(
        { name: 'ID', value: guild.id },
        { name: 'Miembros', value: String(guild.memberCount), inline: true },
        { name: 'Dueño', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Creado', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
      );

    await interaction.reply({ embeds: [embed] });
  },
};
