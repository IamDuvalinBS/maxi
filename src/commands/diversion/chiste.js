import { SlashCommandBuilder } from 'discord.js';
import { chistes } from '../../data/frases.js';
import { elegir } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder().setName('chiste').setDescription('Cuenta un chiste'),

  async execute(interaction) {
    await interaction.reply(`😂 ${elegir(chistes)}`);
  },
};
