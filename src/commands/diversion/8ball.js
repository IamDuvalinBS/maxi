import { SlashCommandBuilder } from 'discord.js';
import { bola8 } from '../../data/frases.js';
import { elegir } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Hazle una pregunta a la bola 8')
    .addStringOption((o) =>
      o.setName('pregunta').setDescription('Lo que quieras saber').setRequired(true).setMaxLength(200),
    ),

  async execute(interaction) {
    const pregunta = interaction.options.getString('pregunta');
    await interaction.reply({
      content: `🎱 **${pregunta}**\n${elegir(bola8)}`,
      allowedMentions: { parse: [] },
    });
  },
};
