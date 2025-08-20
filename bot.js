const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { authenticator } = require('otplib');

// Token do bot e ID do cliente/aplicação
const BOT_TOKEN = 'SEU TOKEN AQUI';
const CLIENT_ID = 'SEU ID AQUI';
const GUILD_ID = '1326580050996236329'; // Opcional para guildas específicas

// Configuração dos comandos
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

// Inicializando o bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Registrando os comandos na API do Discord
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

(async () => {
    try {
        console.log('Registrando comandos slash...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), // Use `applicationCommands` para global
            { body: commands }
        );
        console.log('Comandos slash registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos:', error);
    }
})();

// Quando o bot estiver pronto
client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

// Manipulando os comandos
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'gerar2fa') {
        const key = options.getString('key'); // Obtém a chave 2FA
        try {
            const token = authenticator.generate(key); // Gera o código 2FA

            const embed = new EmbedBuilder()
                .setColor('#2ECC71') // Cor verde semelhante à do botão
                .setTitle('Código 2FA')
                .setDescription(`Seu código 2FA é: \`${token}\``)
                .setFooter({ text: 'Este código é temporário.' });

            await interaction.reply({ embeds: [embed], ephemeral: true }); // Resposta privada
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Erro ao gerar o código. Verifique se a chave está correta.', ephemeral: true });
        }
    }
});

// Login do bot
client.login(BOT_TOKEN);
