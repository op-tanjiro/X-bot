const { smd, bot_ } = require("../lib");
let botSettings = false;

// Command to enable or disable the AntiViewOnce feature
smd(
  {
    cmdname: "antiviewonce",
    alias: ["antivv"],
    desc: "Turn On/Off auto ViewOnce Downloader",
    fromMe: true,
    type: "user",
    use: "<on/off>",
    filename: __filename,
  },
  async (context, message) => {
    try {
      // Retrieve or create the bot settings for the user
      botSettings =
        (await bot_.findOne({
          id: "bot_" + context.user,
        })) ||
        (await bot_.new({
          id: "bot_" + context.user,
        }));

      let command = message.toLowerCase().split(" ")[0].trim();

      if (command === "on" || command === "enable" || command === "act") {
        if (botSettings.antiviewonce === "true") {
          return await context.reply("*AntiViewOnce already enabled!*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + context.user,
          },
          {
            antiviewonce: "true",
          }
        );
        return await context.reply("*AntiViewOnce successfully enabled*");
      } else if (
        command === "off" ||
        command === "disable" ||
        command === "deact"
      ) {
        if (botSettings.antiviewonce === "false") {
          return await context.reply("*AntiViewOnce already disabled*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + context.user,
          },
          {
            antiviewonce: "false",
          }
        );
        return await context.reply("*AntiViewOnce successfully deactivated*");
      } else {
        return await context.send(
          "*_Use on/off to enable/disable AntiViewOnce!_*"
        );
      }
    } catch (error) {
      await context.error(
        error + "\n\nCommand: AntiViewOnce",
        error
      );
    }
  }
);

// Handler for ViewOnce messages
smd(
  {
    on: "viewonce",
  },
  async (context, message) => {
    try {
      // Retrieve bot settings for the user
      if (!botSettings) {
        botSettings = await bot_.findOne({
          id: "bot_" + context.user,
        });
      }
      // Check if AntiViewOnce is enabled
      if (botSettings && botSettings.antiviewonce === "true") {
        // Download the ViewOnce media
        let mediaPath = await context.bot.downloadAndSaveMediaMessage(
          context.msg
        );

        // Construct the notification message with the sender's actual username
        let senderUsername = context.participant || 'Unknown';
        let notificationMessage = `*[VIEWONCE MESSAGE RETRIEVED]*\n\n` +
          `*SENDER:* @${senderUsername}\n` + 
          `*TIME:* ${new Date().toLocaleTimeString()}\n` + 
          `*CHAT:* ${context.chatId || 'Unknown Chat'}\n` + 
          `*MESSAGE:* ${context.body || 'No message content'}\n`; 

        // Send the downloaded media to the user's DM with the notification message
        await context.bot.sendMessage(
          context.user,  // Sending to user's DM
          {
            [context.mtype2.split("Message")[0]]: {
              url: mediaPath,
            },
            caption: notificationMessage,
          }
        );
      }
    } catch (error) {
      console.log("Error while getting AntiViewOnce media: ", error);
    }
  }
);
          
