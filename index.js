const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
  MessageSelectMenu,
  StringSelectMenuOptionBuilder,
  PermissionsBitField,
  Partials,
} = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("@discordjs/builders");
const { token } = require("./private/config.json");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  console.log(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels`,
  );
});

/*client.on("ready", () => {
  client.user.setActivity(status, { type: ActivityType.Watching });
});*/

// Log in to Discord with your client's token
client.login(token);

//ping command
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "intro") {
    console.log(ButtonStyle);
    await interaction.deferReply();

    // Create the embed
    const tournamentEmbed = new EmbedBuilder()
      .addFields({ name: "Welcome to Jojo's Bizarre Collection!", value: " " })
      .setColor([52, 152, 219]);

    // Create the buttons
    const confirm = new ButtonBuilder()
      .setCustomId('confirm') // Correcting the customId usage
      .setLabel('Click Me')   // Label for the button
      .setStyle(ButtonStyle.Success); // Button style

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')  // Set unique custom ID
      .setLabel('Cancel')     // Label for cancel button
      .setStyle(ButtonStyle.Secondary); // Button style

    // Add buttons to a row
    const row = new ActionRowBuilder()
      .addComponents(confirm, cancel);

    // Send the response
    await interaction.editReply({
      content: `Welcome`,
      components: [row],
      embeds: [tournamentEmbed],
    });
  }
  
}); //end of interactionCreate of main commands

//command use logger
client.on("interactionCreate", async (interaction) => {
  // Check if the interaction is a command
  if (!interaction.isCommand()) return;

  // Get the current date and time
  const currentDate = new Date();

  // Format the date as dd/mm/yyyy HH:mm:ss
  const dateFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const dateFormat = currentDate.toLocaleString("en-GB", dateFormatOptions);

  // Calculate the latency of the command execution
  const timeStamp = Date.now();

  // Log the command used by the user along with additional information
  console.log(
    `${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`,
  );
});

// Error handler
client.on("error", async (error) => {
  console.error("Discord client error:", error);

  // Send an error message to the user if available
  if (error.interaction) {
    await error.interaction.reply({
      content: "An error occurred while processing your command.",
      ephemeral: true,
    });
  }
});

process.on("unhandledRejection", async (error) => {
  console.error("Unhandled promise rejection:", error);

  // Send an error message to the user if available
  if (error.interaction) {
    await error.interaction.reply({
      content: "An error occurred while processing your command.",
      ephemeral: true,
    });
  }
});

process.on("uncaughtException", async (err) => {
  const errorMessage = `Uncaught Exception: ${err.message}\nStack: ${err.stack}`;
  console.error(errorMessage);
});

/*Stardust Crusaders Stands

Star Platinum
Magician's Red
Hermit Purple
Hierophant Green
Silver Chariot
The Fool
Holy's Stand
Jonathan's Stand
Tower of Gray
Dark Blue Moon
Strength
Ebony Devil
Yellow Temperance
Hanged Man
Emperor
Empress
Wheel of Fortune
Justice
Lovers
Sun
Death Thirteen
Judgement
High Priestess
Geb
Khnum
Tohth
Anubis
Bastet
Sethan
Osiris
Horus
Atum
Tenore Sax
Cream
The World

Diamond is Unbreakable Stands

Crazy Diamond
Star Platinum
The Hand
Echoes
Heaven's Door
Aqua Necklace
Bad Company
Red Hot Chili Pepper
The Lock
Surface
Love Deluxe
Pearl Jam
Hermit Purple
Achtung Baby
Ratt
Harvest
Cinderella
Atom Heart Father
Boy II Man
Earth Wind and Fire
Highway Star
Stray Cat
Super Fly
Enigma
Cheap Trick
Killer Queen (Sheer Heart Attack / Bites the Dust)

Vento Aureo Stands

Gold Experience
Sticky Fingers
Moody Blues
Sex Pistols
Aerosmith
Purple Haze
Spice Girl
Mr.President
Silver Chariot
Chariot Requiem
Gold Experience Requiem
Echoes
Black Sabbath
Soft Machine
Kraft Work
Little Feet
Man in the Mirror
Beach Boy
The Grateful Dead
Baby Face
White Album
Clash
Talking Head
Notorious B.I.G
Metallica
Green Day
Oasis
Rolling Stones
King Crimson (Epitaph)

Stone Ocean Stands

Stone Free
Star Platinum
Kiss
Burning Down the House
Foo Fighters
Weather Report
Diver Down
Goo Goo Dolls
Manhattan Transfer
Highway to Hell
Marilyn Manson
Jumpin' Jack Flash
Limp Bizkit
Survivor
Planet Waves
Dragon's Dream
Yo-Yo Ma
Green, Green Grass of Home
Jail House Lock
Bohemian Rhapsody
Sky High
Under World
Whitesnake
C-MOON
Made in Heaven

Steel Ball Run Stands

Tusk
Ball Breaker
Ticket to Ride
Oh! Lonesome Me
Scary Monsters
Cream Starter
In a Silent Way
Hey Ya!
Tomb of the Boom 1 2 3
Boku no Rhythm wo Kiitekure
Wired
Mandom
Catch the Rainbow
Sugar Mountain
TATOO YOU!
Tubular Bells
20th Century BOY
Civil War
Chocolate Disco
THE WORLD
Dirty Deeds Done Dirt Cheap (D4C Love Train)

JoJolion Stands

Soft & Wet
Paisley Park
Doggy Style
California King Bed
Born This Way
Killer Queen
Nut King Call
Paper Moon King
King Nothing
Speed King
Love Love Deluxe
Walking Heart
Space Trucking
Awaking III Leaves
Joseph's Stand
Fun Fun Fun
Les Feuilles
I Am a Rock
Doobie Wah!
Schott Key No.1
Schott Key No.2
Vitamin C
Milagroman
Blue Hawaii
Brain Storm
Ozon Baby
Doctor Wu
Wonder of U

The JOJOLands Stands

November Rain
Smooth Operators
THE Hustle
The Matte Kudasai
Bigmouth Strikes Again
Acca Howler's Stand
Bags Groove
Glory Days
Heaven's Door
Cat Size*/
