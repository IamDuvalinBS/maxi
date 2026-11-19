import { SlashCommandBuilder } from 'discord.js';
import { halagos } from '../../data/frases.js';
import { elegir } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder()
    .setName('halago')
    .setDescription('Le dice algo bonito a alguien')
    .addUserOption((o) => o.setName('usuario').setDescription('A quién').setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    await interaction.reply(`🌟 ${user} ${elegir(halagos)}`);
  },
};
