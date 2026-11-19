import { SlashCommandBuilder } from 'discord.js';
import { consejos } from '../../data/frases.js';
import { elegir } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder().setName('consejo').setDescription('Te da un consejo de vida (dudoso)'),

  async execute(interaction) {
    await interaction.reply(`💡 ${elegir(consejos)}`);
  },
};
