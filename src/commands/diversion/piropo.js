import { SlashCommandBuilder } from 'discord.js';
import { piropos } from '../../data/frases.js';
import { elegir } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder()
    .setName('piropo')
    .setDescription('Suelta un piropo')
    .addUserOption((o) => o.setName('usuario').setDescription('A quién se lo dices (opcional)')),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    await interaction.reply(`💘 ${user ? `${user} ` : ''}${elegir(piropos)}`);
  },
};
