/** Devuelve el motivo por el que NO se puede moderar a ese miembro, o null si sí se puede. */
export function motivoParaNoModerar(interaction, miembro) {
  if (miembro.id === interaction.user.id) return 'No puedes hacerlo contigo mismo.';
  if (miembro.id === interaction.client.user.id) return 'No voy a hacerlo conmigo mismo.';

  const esDueno = interaction.guild.ownerId === interaction.user.id;
  if (!esDueno && interaction.member.roles.highest.comparePositionTo(miembro.roles.highest) <= 0) {
    return 'Ese miembro tiene un rol igual o mayor al tuyo.';
  }
  return null;
}
