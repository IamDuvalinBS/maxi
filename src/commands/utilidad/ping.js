import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Muestra la latencia del bot'),

  async execute(interaction) {
    await interaction.reply(`Pong! 🏓 ${interaction.client.ws.ping}ms`);
  },
};
