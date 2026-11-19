import { InteractionContextType, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { motivoParaNoModerar } from '../../utils/moderacion.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un usuario del servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setContexts(InteractionContextType.Guild)
    .addUserOption((o) => o.setName('usuario').setDescription('Usuario a banear').setRequired(true))
    .addStringOption((o) => o.setName('razon').setDescription('Motivo del ban')),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario');
    const razon = interaction.options.getString('razon') ?? 'Sin razón';
    const miembro = await interaction.guild.members.fetch(user.id).catch(() => null);

    // Si no está en el servidor se puede banear igual (por ID); si está, se revisan los roles.
    const rechazo = miembro
      ? motivoParaNoModerar(interaction, miembro) ??
        (!miembro.bannable && 'No puedo banearlo: su rol es igual o mayor al mío.')
      : null;

    if (rechazo) return interaction.reply({ content: rechazo, flags: MessageFlags.Ephemeral });

    await interaction.guild.members.ban(user.id, { reason: `${interaction.user.username}: ${razon}` });
    await interaction.reply(`🔨 **${user.username}** fue baneado. Razón: ${razon}`);
  },
};
