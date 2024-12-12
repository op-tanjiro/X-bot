const {
  tlang,
  getAdmin,
  prefix,
  Config,
  sck,
  sck1,
  fetchJson,
  getBuffer,
  runtime,
  smd
} = require("../lib");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
smd({
  'pattern': 'jid',
  'desc': "get jid of all user in a group.",
  'category': "user",
  'filename': __filename,
  'use': '<@user>'
}, async ({
  jid: _0x317d9b,
  reply: _0x355aae,
  quoted: _0x5256f4
}) => {
  if (_0x5256f4) {
    return _0x355aae(_0x5256f4.sender);
  } else {
    return _0x355aae(_0x317d9b);
  }
});
smd({
  'pattern': "getpp",
  'desc': "Get Profile Pic For Given User",
  'category': "user",
  'filename': __filename
}, async _0x24b8a0 => {
  try {
    let _0x4cd072 = _0x24b8a0.reply_message ? _0x24b8a0.reply_message.sender : _0x24b8a0.mentionedJid[0x0] ? _0x24b8a0.mentionedJid[0x0] : _0x24b8a0.from;
    let _0x23f248;
    try {
      _0x23f248 = await _0x24b8a0.bot.profilePictureUrl(_0x4cd072, "image");
    } catch (_0x42ab42) {
      return _0x24b8a0.reply("```Profile Pic Not Fetched```");
    }
    return await _0x24b8a0.bot.sendMessage(_0x24b8a0.chat, {
      'image': {
        'url': _0x23f248
      },
      'caption': "  *---Profile Pic Is Here---*\n" + Config.caption
    }, {
      'quoted': _0x24b8a0
    });
  } catch (_0x40b881) {
    await _0x24b8a0.error(_0x40b881 + "\n\ncommand : getpp", _0x40b881);
  }
});

smd({
  'pattern': 'wa',
  'desc': "Makes wa me of quoted or mentioned user.",
  'category': "user",
  'filename': __filename
}, async _0x3186cd => {
  try {
    let _0x3c71d6 = _0x3186cd.reply_message ? _0x3186cd.reply_message.sender : _0x3186cd.mentionedJid[0x0] ? _0x3186cd.mentionedJid[0x0] : false;
    await _0x3186cd.reply(!_0x3c71d6 ? "*Please Reply Or Mention A User*" : "https://wa.me/" + _0x3c71d6.split('@')[0x0]);
  } catch (_0x100353) {
    await _0x3186cd.error(_0x100353 + "\n\ncommand : wa", _0x100353, false);
  }
});
smd({
  pattern: "groupnfy",
  desc: "Handles customizable welcome and goodbye messages in the group",
  category: "group",
  filename: __filename
}, async (m) => {
  try {
    // Listen for the 'group-participants-update' event
    m.bot.ev.on('group-participants.update', async (update) => {
      const { id, participants, action } = update;

      // Example placeholders for customizable messages; replace these with actual data fetch if needed
      const defaultWelcome = "👋 Welcome to the group, {{user}}! We're glad to have you here.";
      const defaultGoodbye = "😢 Goodbye, {{user}}! We hope to see you again.";

      // Fetch customizable messages (replace this with actual config fetching logic)
      const getCustomMessage = (type) => {
        // Simulate fetching from a database or config file
        return type === 'welcome' ? defaultWelcome : defaultGoodbye;
      };

      for (let participant of participants) {
        // Get the participant's username
        let user = `@${participant.split('@')[0]}`;

        if (action === 'add') {
          // Get the customizable welcome message and replace the placeholder
          const welcomeMessage = getCustomMessage('welcome').replace('{{user}}', user);
          await m.bot.sendMessage(id, {
            text: welcomeMessage,
            mentions: [participant]
          });
        } else if (action === 'remove') {
          // Get the customizable goodbye message and replace the placeholder
          const goodbyeMessage = getCustomMessage('goodbye').replace('{{user}}', user);
          await m.bot.sendMessage(id, {
            text: goodbyeMessage,
            mentions: [participant]
          });
        }
      }
    });
  } catch (error) {
    console.error("Error in handling group participant updates:", error);
    await m.error(error + "\n\ncommand: groupNotify", error);
  }
});

smd({
  'pattern': 'mee',
  'desc': "Makes wa me for user.",
  'category': "user",
  'filename': __filename
}, async _0x12ac1b => {
  try {
    return await _0x12ac1b.reply("https://wa.me/" + _0x12ac1b.sender.split('@')[0x0]);
  } catch {}
});
