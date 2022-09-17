"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var ids_1 = __importDefault(require("../util/ids"));
exports.default = (function (client) {
    var guild = client.guilds.cache.get(ids_1.default.GUILD);
    var voiceChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(ids_1.default.MEMBER_COUNT_VOICE_CHANNEL);
    if (!voiceChannel || voiceChannel.type !== "GUILD_VOICE") {
        return;
    }
    var updateChannelName = function () {
        voiceChannel.setName("Membres Discord: ".concat(guild === null || guild === void 0 ? void 0 : guild.memberCount.toLocaleString()));
        setTimeout(updateChannelName, 1000 * 60);
    };
    updateChannelName();
});
exports.config = {
    displayName: "Member Count Voice Channel",
    dbName: "MEMBER_COUNT_VC",
};
