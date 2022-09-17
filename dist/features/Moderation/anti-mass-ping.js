"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var discord_js_1 = require("discord.js");
var ids_1 = __importDefault(require("../../util/ids"));
exports.default = (function (client) {
    client.on("messageCreate", function (message) {
        var _a, _b;
        var author = message.author;
        if (!author || author.bot) {
            return;
        }
        if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("ADMINISTRATOR"))
            return;
        var guild = client.guilds.cache.get(ids_1.default.GUILD);
        var logChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(ids_1.default.MOD_LOGS_CHANNEL);
        if ((((_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.size) || 0) >= 4) {
            // TODO: Mute the user
            var embed = new discord_js_1.MessageEmbed()
                .setTitle("Possible Mass Ping")
                .setDescription("**Message**\n\"".concat(message.content, "\""))
                .setFields([
                {
                    name: "Channel Des Ping",
                    value: "".concat(message.channel),
                    inline: true,
                },
                {
                    name: "Auteur Des Ping",
                    value: message.author.toString(),
                    inline: true,
                },
            ]);
            logChannel.send({
                embeds: [embed],
            });
        }
    });
});
exports.config = {
    dbName: "ANTI_MASS_PING",
    displayName: "Anti Mass Ping",
};
