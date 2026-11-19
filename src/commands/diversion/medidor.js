import { SlashCommandBuilder } from 'discord.js';
import { medidores } from '../../data/medidores.js';
import { elegir, entre } from '../../utils/random.js';

const barra = (pct) => '▰'.repeat(Math.round(pct / 10)) + '▱'.repeat(10 - Math.round(pct / 10));

export default {
  data: new SlashCommandBuilder()
    .setName('medidor')
    .setDescription('Mide qué tanto tiene alguien de algo (es broma)')
    .addStringOption((o) =>
      o
        .setName('tipo')
        .setDescription('Qué quieres medir')
        .setRequired(true)
        .addChoices(...medidores.map((m) => ({ name: `${m.emoji} ${m.adj}`, value: m.clave }))),
    )
    .addUserOption((o) => o.setName('usuario').setDescription('Si lo dejas vacío, te mides a ti')),

  async execute(interaction) {
    const medidor = medidores.find((m) => m.clave === interaction.options.getString('tipo'));
    const user = interaction.options.getUser('usuario') ?? interaction.user;
    const pct = entre(0, 100);
    const frase = medidor.frases[Math.min(3, Math.floor(pct / 25))];

    await interaction.reply({
      content: `${medidor.emoji} **${medidor.titulo}**\n${user} → ${barra(pct)} **${pct}%**\n${frase}`,
      allowedMentions: { parse: [] },
    });
  },
};
