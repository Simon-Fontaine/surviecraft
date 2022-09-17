"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var discord_js_1 = require("discord.js");
var ids_1 = __importDefault(require("../../util/ids"));
var recentlySent = {};
var crossPosting = {};
var previousMessages = {};
var recentlyWarned = [];
var clearRecent = function () {
    recentlySent = {};
    crossPosting = {};
    previousMessages = {};
    setTimeout(function () {
        clearRecent();
    }, 1000 * 30);
};
clearRecent();
exports.default = (function (client) {
    client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var member, content, channel, guild, logChannel, id, _a, previous, previousChannelId, amount_1, embed, amount, embed;
        var _b;
        return __generator(this, function (_c) {
            member = message.member, content = message.content, channel = message.channel;
            if (!member || member.user.bot) {
                return [2 /*return*/];
            }
            if ((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has("ADMINISTRATOR"))
                return [2 /*return*/];
            guild = client.guilds.cache.get(ids_1.default.GUILD);
            logChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(ids_1.default.MOD_LOGS_CHANNEL);
            id = member.id;
            _a = previousMessages[id] || ["", ""], previous = _a[0], previousChannelId = _a[1];
            if (previous.toLowerCase() === content) {
                if (channel.id !== previousChannelId) {
                    amount_1 = crossPosting[id] || 0;
                    if (++amount_1 >= 2) {
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("Possible Messages Croisés")
                            .setDescription("**Message**\n\"".concat(content, "\""))
                            .setFields([
                            {
                                name: "Channel",
                                value: "<#".concat(channel.id, "> & <#").concat(previousChannelId, ">"),
                            },
                            {
                                name: "Auteur du message",
                                value: message.author.toString(),
                            },
                        ]);
                        logChannel.send({
                            embeds: [embed],
                        });
                        crossPosting[id] = 0;
                        return [2 /*return*/];
                    }
                    crossPosting[id] = amount_1;
                }
                // @ts-ignore
                message.del();
            }
            previousMessages[id] = [content.toLowerCase(), channel.id];
            amount = recentlySent[id] || 0;
            if (++amount >= 5) {
                embed = new discord_js_1.MessageEmbed()
                    .setTitle("Possible Spam")
                    .setDescription("**Message**\n\"".concat(content, "\""))
                    .setFields([
                    {
                        name: "Channel Du Spam",
                        value: "".concat(channel),
                        inline: true,
                    },
                    {
                        name: "Auteur De Spam",
                        value: message.author.toString(),
                        inline: true,
                    },
                ]);
                logChannel.send({
                    embeds: [embed],
                });
            }
            recentlySent[id] = amount;
            return [2 /*return*/];
        });
    }); });
});
exports.config = {
    dbName: "ANTI_SPAM",
    displayName: "Anti Spam",
};
