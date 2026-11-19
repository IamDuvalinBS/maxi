import { SlashCommandBuilder } from 'discord.js';
import { retos } from '../../data/frases.js';
import { elegir } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder().setName('reto').setDescription('Un reto para el juego de verdad o reto'),

  async execute(interaction) {
    await interaction.reply(`🎯 **Reto:** ${elegir(retos)}`);
  },
};
