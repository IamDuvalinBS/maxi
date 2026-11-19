import { SlashCommandBuilder } from 'discord.js';
import { entre } from '../../utils/random.js';

export default {
  data: new SlashCommandBuilder()
    .setName('dado')
    .setDescription('Tira un dado')
    .addIntegerOption((o) =>
      o.setName('caras').setDescription('Cuántas caras tiene (por defecto 6)').setMinValue(2).setMaxValue(1000),
    ),

  async execute(interaction) {
    const caras = interaction.options.getInteger('caras') ?? 6;
    await interaction.reply(`🎲 Salió **${entre(1, caras)}** (dado de ${caras} caras)`);
  },
};
