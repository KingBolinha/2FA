const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');
const { authenticator } = require('otplib');

const BOT_TOKEN = 'SEU TOKEN AQUI';
const CLIENT_ID = 'SEU ID AQUI';
const GUILD_ID = '1326580050996236329';

const commands = [
    new SlashCommandBuilder()
        .setName('gerar2fa')
        .setDescription('Gera um código 2FA com base em uma chave.')
        .addStringOption(option =>
            option
                .setName('key')
                .setDescription('A chave 2FA secreta.')
                .setRequired(true)
        )
].map(command => command.toJSON());

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

(async () => {
    try {
        console.log('Registrando comandos slash...');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log('Comandos slash registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos:', error);
    }
})();

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'gerar2fa') {
        const key = options.getString('key');

        try {
            const token = authenticator.generate(key);

            const embed = new EmbedBuilder()
                .setColor('#2ECC71')
                .setTitle('Código 2FA')
                .setDescription(`Seu código 2FA é: \`${token}\``)
                .setFooter({ text: 'Este código é temporário.' });

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: 'Erro ao gerar o código. Verifique se a chave está correta.',
                ephemeral: true
            });
        }
    }
});

client.login(BOT_TOKEN);
