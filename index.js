const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
  MessageSelectMenu,
  StringSelectMenuOptionBuilder,
  PermissionsBitField,
  Partials,
  ButtonStyle
} = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
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

//start of interactionCreate of main commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "intro") {
    try {
      // Immediately defer the reply to prevent "Unknown interaction" errors
      await interaction.deferReply();

      // Create the embed
      const tournamentEmbed = new EmbedBuilder()
        .addFields({ name: "Welcome to Jojo's Bizarre Collection!", value: " " })
        .setColor([52, 152, 219]);

      // Create the buttons
      const confirm = new ButtonBuilder()
        .setCustomId("next-page")
        .setLabel("Next")
        .setEmoji({ name: "⏭️" }) 
        .setStyle(ButtonStyle.Primary);

      const cancel = new ButtonBuilder()
        .setCustomId("cancel")
        .setLabel("Cancel")
        .setEmoji({ name: "❌" }) 
        .setStyle(ButtonStyle.Secondary);

      // Add buttons to a row
      const row = new ActionRowBuilder().addComponents(confirm, cancel);

      // Send the response with embed and buttons
      await interaction.editReply({
        content: "Welcome",
        components: [row],
        embeds: [tournamentEmbed],
      });
    } catch (error) {
      console.error("Error during interaction:", error);
      await interaction.editReply({
        content: "An error occurred while processing your request.",
        components: [],
      });
    }
  }

  if (interaction.isButton()) {
    const buttonId = interaction.customId;

    // Modify the existing row and disable buttons after click
    const updatedRow = interaction.message.components[0].components.map((button) =>
      button.setDisabled(true) // Disable the clicked button and others
    );

    // Handle the cancel button click
    if (buttonId === "cancel") {
      await interaction.update({
        content: "The command has been canceled.",
        components: [new ActionRowBuilder().addComponents(updatedRow)],
      });
    }
    // Handle the next-page button click
    else if (buttonId === "next-page") {
      await interaction.update({
        content: "Next page clicked.",
        components: [new ActionRowBuilder().addComponents(updatedRow)],
      });
    }
  }
});

/*client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()&&interaction.customId.startsWith("next-page")){
    interaction.reply("Next page clicked");
  };
  if (interaction.isButton()&&interaction.customId.startsWith("cancel")){
    interaction.reply("Next page clicked");
  };
});*/

//command use logger
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const currentDate = new Date();
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
  const timeStamp = Date.now();
  console.log(
    `${interaction.user.username} ran /${interaction.commandName} command at ${dateFormat} with a latency of ${timeStamp - interaction.createdTimestamp} ms`,
  );
});

// Error handler
client.on("error", async (error) => {
  console.error("Discord client error:", error);
  if (error.interaction) {
    await error.interaction.reply({
      content: "An error occurred while processing your command.",
      ephemeral: true,
    });
  }
});

process.on("unhandledRejection", async (error) => {
  console.error("Unhandled promise rejection:", error);
  if (error.interaction) {
    await interaction.reply({
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
