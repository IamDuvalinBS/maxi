import 'dotenv/config';

export const config = {
  token: process.env.DISCORD_TOKEN, // el único dato secreto, va en .env
  clientId: '1572831033831985182', // ID de la aplicación
  guildId: '', // ID de tu servidor de pruebas (opcional)
};

if (!config.token) {
  console.error('Falta DISCORD_TOKEN en el archivo .env');
  process.exit(1);
}
