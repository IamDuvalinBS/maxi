import { MessageFlags, SlashCommandBuilder } from 'discord.js';

// Solo números y operadores: no hay forma de meter código aquí.
const PERMITIDO = /^[\d+\-*/().%^\s]+$/;

export default {
  data: new SlashCommandBuilder()
    .setName('calc')
    .setDescription('Calcula una operación matemática')
    .addStringOption((o) =>
      o.setName('operacion').setDescription('Ejemplo: (5 + 3) * 2').setRequired(true),
    ),

  async execute(interaction) {
    const operacion = interaction.options.getString('operacion');
    const error = { content: 'Operación inválida. Usa números y + - * / % ^ ( )', flags: MessageFlags.Ephemeral };

    if (!PERMITIDO.test(operacion)) return interaction.reply(error);

    let resultado;
    try {
      resultado = new Function(`return (${operacion.replaceAll('^', '**')})`)();
    } catch {
      return interaction.reply(error);
    }

    if (typeof resultado !== 'number' || !Number.isFinite(resultado)) return interaction.reply(error);

    await interaction.reply(`🧮 \`${operacion}\` = **${resultado}**`);
  },
};
