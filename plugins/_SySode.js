const {
  exec
} = require("child_process");
const {
  plugins,
  smd,
  Config
} = require("../lib");
let s_ser = true;
smd(
   {
     cmdname: "shutdown",
     info: "To restart bot",
     type: "tools",
     fromMe: s_ser,
     filename: __filename,
   },
   async (_0x514d3c) => {
     const { exec: _0x1912df } = require("child_process");
     _0x514d3c.reply("Shutting Down");
     _0x1912df("pm2 stop all");
   }
 );
smd({
  cmdname: "restart",
  info: "To restart bot",
  type: "tools",
  fromMe: s_ser,
  filename: __filename
}, async _0x514d3c => {
  const {
    exec: _0x1912df
  } = require("child_process");
  _0x514d3c.reply("X-bot is restarting ♻️");
  _0x1912df("pm2 restart all");
});
smd(
 {
   cmdname: "plugins",
   alias: ["plugin"],
   type: "owner",
   info: "Shows list of all externally installed modules",
   fromMe: s_ser,
   filename: __filename,
   use: "<name>",
 },
 async (cld, pluginName) => {
   try {
     let installedPlugins = await plugins(cld, "plugins", pluginName);
     return await cld.send(
       !installedPlugins
         ? "*_There's no plugin install in " + Config.botname + "_*"
         : !pluginName
         ? "*All Installed Modules are:-*\n\n" + installedPlugins
         : installedPlugins
     );
   } catch (err) {
     cld.error(err + " \n\ncmdName plugins\n");
   }
 }
);
smd({
  pattern: "remove",
  alias: ["uninstall"],
  type: "owner",
  info: "removes external modules.",
  fromMe: s_ser,
  filename: __filename,
  use: "<plugin name>"
}, async (_0x1510c9, _0x40e763) => {
  if (!_0x40e763) {
    return await _0x1510c9.reply("*_Uhh Please, Provide Me Plugin Name_*");
  }
  if (_0x40e763 === "alls") {
    return await _0x1510c9.reply(await plugins("remove", "all", __dirname));
  }
  try {
    await _0x1510c9.send(await plugins(_0x1510c9, "remove", _0x40e763, __dirname), {}, "", _0x1510c9);
  } catch {}
});
smd({
  cmdname: "install",
  type: "owner",
  info: "Installs external modules..",
  fromMe: s_ser,
  filename: __filename,
  use: "<gist url>"
}, async (_0xf71b5c, _0x2bdd09) => {
  let _0x2b0828 = _0x2bdd09 ? _0x2bdd09 : _0xf71b5c.quoted ? _0xf71b5c.quoted.text : "";
  if (!_0x2b0828.toLowerCase().includes("https")) {
    return await _0xf71b5c.send("*_Uhh Please, Provide Me Plugin Url_*");
  }
  await _0xf71b5c.reply(await plugins(_0xf71b5c, "install", _0x2b0828, __dirname));
});
