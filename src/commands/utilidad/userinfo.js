import { EmbedBuilder, InteractionContextType, SlashCommandBuilder } from 'discord.js';

const fecha = (ms) => `<t:${Math.floor(ms / 1000)}:D>`;

export default {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Muestra información de un usuario')
    .setContexts(InteractionContextType.Guild)
    .addUserOption((o) => o.setName('usuario').setDescription('Si lo dejas vacío, usa el tuyo')),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario') ?? interaction.user;
    const miembro = await interaction.guild.members.fetch(user.id).catch(() => null);

    const embed = new EmbedBuilder()
      .setTitle(user.username)
      .setThumbnail(user.displayAvatarURL())
      .setColor(0x5865f2)
      .addFields(
        { name: 'ID', value: user.id },
        { name: 'Cuenta creada', value: fecha(user.createdTimestamp), inline: true },
      );

    if (miembro) {
      embed.addFields({ name: 'Se unió al servidor', value: fecha(miembro.joinedTimestamp), inline: true });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
