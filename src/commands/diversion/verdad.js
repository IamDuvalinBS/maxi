import { SlashCommandBuilder } from 'discord.js';
import { verdades } from '../../data/frases.js';
import { elegir } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder().setName('verdad').setDescription('Una pregunta para el juego de verdad o reto'),

  async execute(interaction) {
    await interaction.reply(`🫣 **Verdad:** ${elegir(verdades)}`);
  },
};
