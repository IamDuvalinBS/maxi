import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

const capitalizar = (texto) => texto[0].toUpperCase() + texto.slice(1);

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra todos los comandos del bot'),

  async execute(interaction) {
    const porCategoria = {};
    for (const command of interaction.client.commands.values()) {
      (porCategoria[command.category] ??= []).push(command);
    }

    const embed = new EmbedBuilder().setTitle('Comandos').setColor(0x5865f2);
    for (const [categoria, lista] of Object.entries(porCategoria)) {
      embed.addFields({
        name: capitalizar(categoria),
        value: lista.map((c) => `\`/${c.data.name}\` ${c.data.description}`).join('\n'),
      });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
