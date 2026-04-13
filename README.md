🔐 Discord 2FA Generator Bot

A lightweight Discord bot built with discord.js that generates Time-based One-Time Passwords (TOTP) using a provided secret key.
Designed for simplicity, security, and real-time usage via slash commands.

✨ Features
🔑 Generate 2FA/TOTP codes using a secret key
⚡ Slash command support (/gerar2fa)
🔒 Ephemeral responses (private to the user)
📦 Clean and minimal architecture
🚀 Fast and easy deployment

⚙️ Command
/gerar2fa

Generate a 2FA code based on a secret key.

Options:

key (string, required) → Secret key used for TOTP generation

Example:
/gerar2fa key: JBSWY3DPEHPK3PXP

🧠 How It Works

The bot uses the otplib library to generate Time-based One-Time Passwords (TOTP), following the same standard used by apps like:

Google Authenticator
Microsoft Authenticator
Authy

Each generated code:

Is time-based
Expires automatically (usually every 30 seconds)

🛠️ Tech Stack
Node.js
discord.js v14
otplib

🚀 Setup
Clone the repository:
git clone https://github.com/seu-user/seu-repo.git

Install dependencies:
npm install

Configure environment variables:
BOT_TOKEN=seu_token_aqui
CLIENT_ID=seu_client_id
GUILD_ID=seu_guild_id

Run the bot:
node index.js

🔐 Security Notes
Never expose your bot token publicly
Avoid logging or storing secret 2FA keys
Use ephemeral responses to protect sensitive data

📌 Use Cases
Internal tools for developers
Automation of authentication workflows
Quick access to TOTP codes inside Discord

📄 License

This project is open for use and modification. Consider adding an appropriate license (MIT recommended).
