import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Muestra la foto de perfil de un usuario')
    .addUserOption((o) => o.setName('usuario').setDescription('Si lo dejas vacío, usa el tuyo')),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario') ?? interaction.user;
    const embed = new EmbedBuilder()
      .setTitle(`Avatar de ${user.username}`)
      .setImage(user.displayAvatarURL({ size: 1024 }))
      .setColor(0x5865f2);

    await interaction.reply({ embeds: [embed] });
  },
};
