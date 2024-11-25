const { SlashCommandBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
  .setName('intro')
  .setDescription("Start your journey in Jojo's Bizarre Collection");
module.exports = {
  data: command,
  async execute(interaction) {
    await interaction.reply('Starting...');
  },
};