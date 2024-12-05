const {
  smd,
  fetchJson,
  astroJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  prefix,
  Config,
} = require("../lib");
const {  download } = require("@bochilteam/scraper")
const googleTTS = require("google-tts-api");
const search = require("yt-search");
const yts = require("secktor-pack");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
const path = require("path");
var videotime = 2000;
const { cmd } = require("../lib/plugins");

smd({
  'pattern': "play",
  'react': "🎵",
  'alias': ["music"],
  'desc': "Downloads audio from YouTube.",
  'category': "downloader",
  'filename': __filename,
  'use': "<search text>"
}, async (_0x213b75, _0x13be17) => {
  try {
    if (!_0x13be17) {
      return await _0x213b75.reply("*_Give Me a Search Query_*");
    }

    // Search for the video
    let _0x14c1a1 = await yts(_0x13be17);
    let _0x4f86cb = _0x14c1a1.all[0];
    if (!_0x4f86cb) {
      return await _0x213b75.reply("*_No results found for your search_*");
    }

    // Send thumbnail and video details
    let _0x4342ba = await smdBuffer(_0x4f86cb.thumbnail);
    await _0x213b75.bot.sendMessage(_0x213b75.jid, {
      'image': _0x4342ba,
      'caption': "\n*-X-:bot • ᴍᴜꜱɪᴄ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n\n*Title :* " + _0x4f86cb.title + "\n*Url :* " + _0x4f86cb.url + "\n*Description :* " + _0x4f86cb.timestamp + "\n*Views :* " + _0x4f86cb.views + "\n*Uploaded :* " + _0x4f86cb.ago + "\n*Author :* " + _0x4f86cb.author.name + "\n\n_-X-:bot is downloading your music..._\n"
    });

    // Use the new API to get download links
    const downloadApiUrl = "https://api.giftedtech.my.id/api/download/ytaudio?apikey=gifted&url=" + encodeURIComponent(_0x4f86cb.url);
    
    let _0x4acf6c = 3; // Retry logic
    while (_0x4acf6c > 0) {
      try {
        const _0x2cc463 = await axios.get(downloadApiUrl);
        const _0x509920 = _0x2cc463.data;
        console.log("API Response:", _0x509920);

        if (_0x509920.status && _0x509920.result.mp3) {
          const _0x539170 = _0x509920.result.mp3;
          
          // Download the mp3 file
          const _0x3ce5d2 = await axios({
            'url': _0x539170,
            'method': "GET",
            'responseType': "stream"
          });
          const _0x239ef4 = path.join(__dirname, _0x4f86cb.title + ".mp3");
          const _0x49450f = fs.createWriteStream(_0x239ef4);
          _0x3ce5d2.data.pipe(_0x49450f);

          await new Promise((_0x46fbcf, _0x176108) => {
            _0x49450f.on("finish", _0x46fbcf);
            _0x49450f.on("error", _0x176108);
          });
          
          console.log("Audio saved to " + _0x239ef4);

          // Send the audio file
          await _0x213b75.bot.sendMessage(_0x213b75.jid, {
            'audio': {
              'url': _0x239ef4
            },
            'fileName': _0x4f86cb.title + ".mp3",
            'mimetype': "audio/mpeg"
          }, {
            'quoted': _0x213b75
          });
          
          fs.unlinkSync(); // Delete the file after sending
          return;
        } else {
          console.log("Error: Could not download audio, API response:", _0x509920);
          await _0x213b75.reply("*_Error: Could not download the audio. Please try again later!_*");
          return;
        }
      } catch (_0x2b8c59) {
        console.error("Retry Error:", _0x2b8c59);
        _0x4acf6c--;
        if (_0x4acf6c === 0) {
          await _0x213b75.reply("*_Error: Could not download the audio after multiple attempts. Please try again later!_*");
        }
      }
    }
  } catch (_0x3c9fcf) {
    console.error("Caught Error:", _0x3c9fcf);
    return _0x213b75.error(_0x3c9fcf + "\n\ncommand: playy", _0x3c9fcf, "*_File not found!!_*");
  }
});
smd({  
  pattern: "play2",
    alias: ["yta","song"],
    use: '.play koun umar',
    react: "🎧",
    desc: "Search & download yt song.",
    category: "download",
    filename: __filename
},

async(conn, q, mek, m,{from, l, quoted, body, isCmd, darkneo, args, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('Please give me quary to download')
let yts = require("yt-search")
let search = await yts(q)
let anu = search.videos[0]
const cap = `*X-bot MUSIC DOWNLOADER 🛜*

TITLE: ${anu.title}

🔗𝐔𝐑𝐋 : ${anu.url}

🌐𝐃𝐔𝐑𝐀𝐓𝐈𝐎𝐍 : ${anu.timestamp}

📟𝐕𝐈𝐄𝐖𝐒: ${anu.views}


*X-ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ X*

*X-teams solo-X*


❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁❁`
await conn.sendMessage(from, { image: { url: anu.thumbnail }, caption: cap}, { quoted: mek })
const yt2 = await dl.youtubedl(anu.url)
if (yt2.audio['128kbps'].fileSizeH.includes('MB') && yt2.audio['128kbps'].fileSizeH.replace(' MB','') >= config.MAX_SIZE) return await conn.sendMessage(from, { text: '*This video too big !!*' }, { quoted: mek });
var du = await yt2.audio['128kbps'].download()
    let senda =  await conn.sendMessage(from, { document: { url : du }, mimetype: 'audio/mpeg', fileName: yt2.title + '.mp3',caption: '> ᴍᴜsɪᴄ ʙʏ X-ʙᴏᴛ ✅' }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
    
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})

} catch (e) {
  reply("ERROR ")
  l(e)
}
})
smd({
  'pattern': "ytmp4",
  'react': "🎥",
  'alias': ["videourl"],
  'desc': "Downloads video from a YouTube URL.",
  'category': "downloader",
  'filename': __filename,
  'use': "<YouTube URL>"
}, async (_0x213b75, _0x13be17) => {
  try {
    if (!_0x13be17) {
      return await _0x213b75.reply("*_Please provide a valid YouTube URL_*");
    }

    const youtubeUrl = _0x13be17.trim();

    // Use the new API to get download links
    const downloadApiUrl = "https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=" + encodeURIComponent(youtubeUrl);
    
    let _0x4acf6c = 3; // Retry logic
    while (_0x4acf6c > 0) {
      try {
        const _0x2cc463 = await axios.get(downloadApiUrl);
        const _0x509920 = _0x2cc463.data;
        console.log("API Response:", _0x509920);

        if (_0x509920.status && _0x509920.result.mp4) {
          const _0x539170 = _0x509920.result.mp4;
          
          // Download the mp4 file
          const _0x3ce5d2 = await axios({
            'url': _0x539170,
            'method': "GET",
            'responseType': "stream"
          });
          const _0x239ef4 = path.join(__dirname, _0x509920.result.title + ".mp4");
          const _0x49450f = fs.createWriteStream(_0x239ef4);
          _0x3ce5d2.data.pipe(_0x49450f);

          await new Promise((_0x46fbcf, _0x176108) => {
            _0x49450f.on("finish", _0x46fbcf);
            _0x49450f.on("error", _0x176108);
          });
          
          console.log("Video saved to " + _0x239ef4);

          // Send the video file
          await _0x213b75.bot.sendMessage(_0x213b75.jid, {
            'video': {
              'url': _0x239ef4
            },
            'fileName': _0x509920.result.title + ".mp4",
            'mimetype': "video/mp4"
          }, {
            'quoted': _0x213b75
          });
          
          fs.unlinkSync(_0x239ef4); // Delete the file after sending
          return;
        } else {
          console.log("Error: Could not download video, API response:", _0x509920);
          await _0x213b75.reply("*_Error: Could not download the video. Please try again later!_*");
          return;
        }
      } catch (_0x2b8c59) {
        console.error("Retry Error:", _0x2b8c59);
        _0x4acf6c--;
        if (_0x4acf6c === 0) {
          await _0x213b75.reply("*_Error: Could not download the video after multiple attempts. Please try again later!_*");
        }
      }
    }
  } catch (_0x3c9fcf) {
    console.error("Caught Error:", _0x3c9fcf);
    return _0x213b75.error(_0x3c9fcf + "\n\ncommand: playvideourl", _0x3c9fcf, "*_File not found!!_*");
  }
});
smd({
  'pattern': "ytmp3",
  'react': "🎶",
  'alias': ["musicurl"],
  'desc': "Downloads audio from a YouTube URL.",
  'category': "downloader",
  'filename': __filename,
  'use': "<YouTube URL>"
}, async (_0x213b75, _0x13be17) => {
  try {
    if (!_0x13be17) {
      return await _0x213b75.reply("*_Please provide a valid YouTube URL_*");
    }

    const youtubeUrl = _0x13be17.trim();

    // Use the new API to get download links
    const downloadApiUrl = "https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=" + encodeURIComponent(youtubeUrl);
    
    let _0x4acf6c = 3; // Retry logic
    while (_0x4acf6c > 0) {
      try {
        const _0x2cc463 = await axios.get(downloadApiUrl);
        const _0x509920 = _0x2cc463.data;
        console.log("API Response:", _0x509920);

        if (_0x509920.status && _0x509920.result.mp3) {
          const _0x539170 = _0x509920.result.mp3;
          
          // Download the mp3 file
          const _0x3ce5d2 = await axios({
            'url': _0x539170,
            'method': "GET",
            'responseType': "stream"
          });
          const _0x239ef4 = path.join(__dirname, _0x509920.result.title + ".mp3");
          const _0x49450f = fs.createWriteStream(_0x239ef4);
          _0x3ce5d2.data.pipe(_0x49450f);

          await new Promise((_0x46fbcf, _0x176108) => {
            _0x49450f.on("finish", _0x46fbcf);
            _0x49450f.on("error", _0x176108);
          });
          
          console.log("Audio saved to " + _0x239ef4);

          // Send the audio file
          await _0x213b75.bot.sendMessage(_0x213b75.jid, {
            'audio': {
              'url': _0x239ef4
            },
            'fileName': _0x509920.result.title + ".mp3",
            'mimetype': "audio/mpeg"
          }, {
            'quoted': _0x213b75
          });
          
          fs.unlinkSync(_0x239ef4); // Delete the file after sending
          return;
        } else {
          console.log("Error: Could not download audio, API response:", _0x509920);
          await _0x213b75.reply("*_Error: Could not download the audio. Please try again later!_*");
          return;
        }
      } catch (_0x2b8c59) {
        console.error("Retry Error:", _0x2b8c59);
        _0x4acf6c--;
        if (_0x4acf6c === 0) {
          await _0x213b75.reply("*_Error: Could not download the audio after multiple attempts. Please try again later!_*");
        }
      }
    }
  } catch (_0x3c9fcf) {
    console.error("Caught Error:", _0x3c9fcf);
    return _0x213b75.error(_0x3c9fcf + "\n\ncommand: playurl", _0x3c9fcf, "*_File not found!!_*");
  }
});;
smd({
  'pattern': "ytsv",
  'alias': ["video"],
  'desc': "Downloads video from YouTube.",
  'category': "downloader",
  'filename': __filename,
  'use': "<search text>"
}, async (_0x213b75, _0x13be17) => {
  try {
    if (!_0x13be17) {
      return await _0x213b75.reply("*_Give Me a Search Query_*");
    }

    // Search for the video
    let _0x14c1a1 = await yts(_0x13be17);
    let _0x4f86cb = _0x14c1a1.all[0];
    if (!_0x4f86cb) {
      return await _0x213b75.reply("*_No results found for your search_*");
    }

    // Send thumbnail and video details
    let _0x4342ba = await smdBuffer(_0x4f86cb.thumbnail);
    await _0x213b75.bot.sendMessage(_0x213b75.jid, {
      'image': _0x4342ba,
      'caption': "\n*-X-:bot • ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n\n*Title :* " + _0x4f86cb.title + "\n*Url :* " + _0x4f86cb.url + "\n*Description :* " + _0x4f86cb.timestamp + "\n*Views :* " + _0x4f86cb.views + "\n*Uploaded :* " + _0x4f86cb.ago + "\n*Author :* " + _0x4f86cb.author.name + "\n\n_-X-:bot is preparing the video..._\n"
    });

    // Use the new API to get download links
    const downloadApiUrl = "https://api.giftedtech.my.id/api/download/ytvideo?apikey=gifted&url=" + encodeURIComponent(_0x4f86cb.url);
    
    let _0x4acf6c = 3; // Retry logic
    while (_0x4acf6c > 0) {
      try {
        const _0x2cc463 = await axios.get(downloadApiUrl);
        const _0x509920 = _0x2cc463.data;
        console.log("API Response:", _0x509920);

        if (_0x509920.status && _0x509920.result.mp4) {
          const _0x539170 = _0x509920.result.mp4;
          
          // Download the mp4 file
          const _0x3ce5d2 = await axios({
            'url': _0x539170,
            'method': "GET",
            'responseType': "stream"
          });
          const _0x239ef4 = path.join(__dirname, _0x4f86cb.title + ".mp4");
          const _0x49450f = fs.createWriteStream(_0x239ef4);
          _0x3ce5d2.data.pipe(_0x49450f);

          await new Promise((_0x46fbcf, _0x176108) => {
            _0x49450f.on("finish", _0x46fbcf);
            _0x49450f.on("error", _0x176108);
          });
          
          console.log("Video saved to " + _0x239ef4);

          // Send the video file
          await _0x213b75.bot.sendMessage(_0x213b75.jid, {
            'video': {
              'url': _0x239ef4
            },
            'fileName': _0x4f86cb.title + ".mp4",
            'mimetype': "video/mp4"
          }, {
            'quoted': _0x213b75
          });
          
          fs.unlinkSync(_0x239ef4); // Delete the file after sending
          return;
        } else {
          console.log("Error: Could not download video, API response:", _0x509920);
          await _0x213b75.reply("*_Error: Could not download the video. Please try again later!_*");
          return;
        }
      } catch (_0x2b8c59) {
        console.error("Retry Error:", _0x2b8c59);
        _0x4acf6c--;
        if (_0x4acf6c === 0) {
          await _0x213b75.reply("*_Error: Could not download the video after multiple attempts. Please try again later!_*");
        }
      }
    }
  } catch (_0x3c9fcf) {
    console.error("Caught Error:", _0x3c9fcf);
    return _0x213b75.error(_0x3c9fcf + "\n\ncommand: youtubevideo", _0x3c9fcf, "*_File not found!!_*");
  }
});
