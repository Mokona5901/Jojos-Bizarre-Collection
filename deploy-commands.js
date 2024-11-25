const { REST } = require("discord.js");
const { Routes } = require("discord.js");
const {
  clientId,
  token
} = require("./private/config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];

// Load global commands
const commandsPath = path.join(__dirname, "global");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./global/${file}`);
  if (!command.data) {
    console.error(`Command data is missing in global/${file}`);
    continue;
  }
  commands.push(command.data.toJSON());
}

// Prepare REST instances
const rest = new REST({ version: "10" }).setToken(token);
(async () => {
  try {
    // Deploy global commands (only once)
    console.log(`Started refreshing ${commands.length} global commands.`);
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log(`Successfully reloaded ${commands.length} global commands.`);
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
})();

