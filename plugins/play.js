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
const { search, download } = require("aptoide-scraper")
const googleTTS = require("google-tts-api");
const ytdl = require("yt-search");
const yts = require("secktor-pack");
const dl = require("@bochilteam/scraper");
const fs = require("fs");
const axios = require("axios");
const fetch = require("node-fetch");
const path = require("path");
var videotime = 2000;
const { cmd } = require("../lib");

smd({
  'pattern': "play",
  'react': "🎵",
  'alias': ["music"],
  'desc': "Downloads audio from YouTube.",
  'category': "downloader",
  'filename': __filename,
  'use': "<search text>"
}, async (m, text, { conn, command, usedPrefix }) => {
  if (!text) throw `Use example: ${usedPrefix}${command} anna blue bird`;
  await m.react('⏳'); // Assuming rwait is an emoji

  try {
    const query = encodeURIComponent(text);
    const response = await axios.get(`https://apisku-furina.vercel.app/api/downloader/play?q=${query}&apikey=indradev`);
    const result = response.data.results[0];

    if (!result) throw 'Video Not Found, Try Another Title';

    const { title, thumbnail, duration, views, uploaded, url } = result;

    const captvid = `✼ ••๑⋯ ❀ Y O U T U B E ❀ ⋯⋅๑•• ✼
❏ Title: ${title}
❐ Duration: ${duration}
❑ Views: ${views}
❒ Upload: ${uploaded}
❒ Link: ${url}

> I CAN'T DOWNLOAD FOR YOU NOW WE ARE FIXING THE PROBLEM.
⊱─━━━━⊱༻●༺⊰━━━━─⊰`;

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid }, { quoted: m });

    const audioStream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    const tmpDir = os.tmpdir();
    const audioPath = `${tmpDir}/${title}.mp3`;
    const writableStream = fs.createWriteStream(audioPath);

    await streamPipeline(audioStream, writableStream);

    const doc = {
      audio: {
        url: audioPath,
      },
      mimetype: 'audio/mpeg',
      ptt: false,
      waveform: [100, 0, 0, 0, 0, 0, 100],
      fileName: title,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          body: 'HERE IS YOUR SONG',
          sourceUrl: url,
          thumbnail: await (await conn.getFile(thumbnail)).data,
        },
      },
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });

    // Cleanup
    await fs.promises.unlink(audioPath);
    console.log(`Deleted audio file: ${audioPath}`);
  } catch (error) {
    console.error(error);
    throw 'An error occurred while searching for YouTube videos.';
  }
  });
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
