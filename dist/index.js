"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importStar(require("discord.js"));
var wokcommands_1 = __importDefault(require("wokcommands"));
var path_1 = __importDefault(require("path"));
require("dotenv/config");
require("./server");
var ids_1 = __importDefault(require("./util/ids"));
var token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error("No Discord bot token found!");
}
var client = new discord_js_1.default.Client({
  intents: [
    discord_js_1.Intents.FLAGS.GUILDS,
    discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
    discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
    discord_js_1.Intents.FLAGS.GUILD_INVITES,
  ],
  allowedMentions: {
    roles: [],
  },
});
client.setMaxListeners(0);
client.on("ready", function () {
  var guild = client.guilds.cache.get(ids_1.default.GUILD);
  if (!guild) {
    return console.error("No guild found! Please invite it to the test server.");
  }
  // @ts-ignore
  discord_js_1.default.Message.prototype.del = function () {
    if (this.deletable) {
      try {
        this.delete();
      } catch (ignored) {}
    }
  };
  new wokcommands_1.default(client, {
    commandsDir: path_1.default.join(__dirname, "commands"),
    featuresDir: path_1.default.join(__dirname, "features"),
    messagesPath: path_1.default.join(__dirname, "messages.json"),
    testServers: [ids_1.default.GUILD, "400071438633271299"],
    typeScript: process.env.PROD !== "true",
    mongoUri: process.env.MONGO_URI,
    botOwners: [ids_1.default.SIMON],
    disabledDefaultCommands: [
      "help",
      // 'command',
      "language",
      // 'prefix',
      // 'requiredrole'
    ],
  }).setDisplayName("SurvieCraft");
});
client.login(token);
