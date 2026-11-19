import { SlashCommandBuilder } from 'discord.js';
import { roasts } from '../../data/frases.js';
import { elegir } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder()
    .setName('roast')
    .setDescription('Se burla (con cariño) de alguien')
    .addUserOption((o) => o.setName('usuario').setDescription('A quién').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    await interaction.reply(`🔥 ${user} ${elegir(roasts)}`);
  },
};
