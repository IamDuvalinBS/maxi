import { InteractionContextType, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { motivoParaNoModerar } from '../../utils/moderacion.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsa a un miembro del servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setContexts(InteractionContextType.Guild)
    .addUserOption((o) => o.setName('usuario').setDescription('Miembro a expulsar').setRequired(true))
    .addStringOption((o) => o.setName('razon').setDescription('Motivo de la expulsión')),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    const razon = interaction.options.getString('razon') ?? 'Sin razón';
    const miembro = await interaction.guild.members.fetch(user.id).catch(() => null);

    const rechazo = !miembro
      ? 'Ese usuario no está en el servidor.'
      : motivoParaNoModerar(interaction, miembro) ??
        (!miembro.kickable && 'No puedo expulsarlo: su rol es igual o mayor al mío.');

    if (rechazo) return interaction.reply({ content: rechazo, flags: MessageFlags.Ephemeral });

    await miembro.kick(`${interaction.user.username}: ${razon}`);
    await interaction.reply(`👢 **${user.username}** fue expulsado. Razón: ${razon}`);
  },
};
