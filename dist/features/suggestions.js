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
exports.config = exports.statusMessages = exports.updateSuggestion = void 0;
var discord_js_1 = require("discord.js");
var suggestions_schema_1 = __importDefault(require("../models/suggestions-schema"));
var ids_1 = __importDefault(require("../util/ids"));
var seconds = 30;
var sendButtons = function (guild, channel, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                    var discordEmoji, emojis, emojiString, emoji, categoryMessage, newMessage, filter, collector;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                discordEmoji = guild.emojis.cache.find(function (emoji) { return emoji.name === "discord"; });
                                if (!discordEmoji) {
                                    throw new Error("Could not find the Discord emoji.");
                                }
                                emojis = (_a = {
                                        "📺": "Idées Nouveau Contenu"
                                    },
                                    _a[discordEmoji.toString()] = "Idées Serveur Discord",
                                    _a["🌄"] = "Idées Serveur Survie",
                                    _a["❓"] = "Autre",
                                    _a);
                                emojiString = "";
                                for (emoji in emojis) {
                                    emojiString += "".concat(emoji, " = ").concat(emojis[emoji], "\n");
                                }
                                emojiString = emojiString.substring(0, emojiString.length - 1);
                                categoryMessage = new discord_js_1.MessageActionRow()
                                    .addComponents(new discord_js_1.MessageButton().setCustomId("📺").setLabel("Idée de nouveau contenu").setEmoji("📺").setStyle("SECONDARY"))
                                    .addComponents(new discord_js_1.MessageButton()
                                    .setCustomId(discordEmoji.toString())
                                    .setLabel("Idée pour le serveur Discord")
                                    .setEmoji(discordEmoji)
                                    .setStyle("SECONDARY"))
                                    .addComponents(new discord_js_1.MessageButton().setCustomId("🌄").setLabel("Idée pour le serveur Survie").setEmoji("🌄").setStyle("SECONDARY"))
                                    .addComponents(new discord_js_1.MessageButton().setCustomId("❓").setLabel("Autre").setEmoji("❓").setStyle("SECONDARY"));
                                return [4 /*yield*/, channel.send({
                                        content: "<@".concat(id, "> Veuillez s\u00E9lectionner le type de suggestion dont il s'agit\n\n").concat(emojiString, "\n\n_Veuillez cliquer sur un bouton dans les **").concat(seconds, "** secondes_"),
                                        components: [categoryMessage],
                                    })];
                            case 1:
                                newMessage = _b.sent();
                                filter = function (i) { return i.user.id === id; };
                                collector = channel.createMessageComponentCollector({
                                    filter: filter,
                                    max: 1,
                                    time: 1000 * seconds,
                                });
                                collector.on("end", function (collection) {
                                    // @ts-ignore
                                    newMessage.del();
                                    var first = collection.first();
                                    if (!first || !first.customId) {
                                        resolve({ emoji: "", text: "" });
                                        return;
                                    }
                                    var emoji = first.customId;
                                    var text = emojis[emoji];
                                    resolve({ emoji: emoji, text: text });
                                });
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var updateSuggestion = function (guild, message, newStatus, notes) { return __awaiter(void 0, void 0, void 0, function () {
    var oldEmbed, embed, result, memberId, chatChannel;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                oldEmbed = message.embeds[0];
                embed = new discord_js_1.MessageEmbed()
                    .setAuthor({ name: ((_a = oldEmbed.author) === null || _a === void 0 ? void 0 : _a.name) || "", iconURL: (_b = oldEmbed.author) === null || _b === void 0 ? void 0 : _b.iconURL })
                    .setDescription(oldEmbed.description || "")
                    .setColor(newStatus.color)
                    .setFooter({ text: "Vous voulez suggérer quelque chose ? Il suffit de le taper dans ce salon !" });
                embed.addFields({
                    name: "Statut",
                    value: "".concat(newStatus.text).concat(notes ? " **Raison:** ".concat(notes) : ""),
                }, oldEmbed.fields[1]);
                message.edit({
                    embeds: [embed],
                });
                return [4 /*yield*/, suggestions_schema_1.default.findById(message.id)];
            case 1:
                result = _c.sent();
                if (result) {
                    memberId = result.memberId;
                    chatChannel = guild.channels.cache.get(ids_1.default.SUGGESTIONS_CHAT_CHANNEL);
                    if (!chatChannel) {
                        return [2 /*return*/];
                    }
                    chatChannel.send("Le status de la suggestion de <@".concat(memberId, "> a chang\u00E9 en ").concat(newStatus.text).concat(notes ? "\n**Raison:** \"".concat(notes, "\"") : "", "\n\nhttps://discord.com/channels/").concat(ids_1.default.GUILD, "/").concat(message.channel.id, "/").concat(message.id));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.updateSuggestion = updateSuggestion;
exports.default = (function (client) {
    client.on("messageReactionAdd", function (reaction, user) { return __awaiter(void 0, void 0, void 0, function () {
        var message, channel, guild;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = reaction.message;
                    if (!message.partial) return [3 /*break*/, 2];
                    return [4 /*yield*/, message.fetch()];
                case 1:
                    message = _a.sent();
                    _a.label = 2;
                case 2:
                    channel = message.channel, guild = message.guild;
                    if (user.id === ids_1.default.SIMON && channel.id === ids_1.default.SUGGESTIONS_CHANNEL) {
                        if (reaction.emoji.name === "👍") {
                            (0, exports.updateSuggestion)(guild, message, exports.statusMessages.ACCEPTED);
                        }
                        else if (reaction.emoji.name === "👎") {
                            (0, exports.updateSuggestion)(guild, message, exports.statusMessages.DENIED);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var guild, content, member, channel, words, newMessage_1, _a, emoji, text, status, embed, newMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    guild = message.guild, content = message.content, member = message.member;
                    channel = message.channel;
                    if (channel.id !== ids_1.default.SUGGESTIONS_CHANNEL || !member || member.user.bot || !guild) {
                        return [2 /*return*/];
                    }
                    if (content === "!suggestion") {
                        return [2 /*return*/];
                    }
                    // @ts-ignore
                    message.del();
                    words = content.split(" ").length;
                    if (!(words < 5)) return [3 /*break*/, 2];
                    return [4 /*yield*/, message.channel.send({
                            content: "".concat(message.author, " veuillez fournir plus de d\u00E9tails sur votre id\u00E9e!"),
                        })];
                case 1:
                    newMessage_1 = _b.sent();
                    setTimeout(function () {
                        // @ts-ignore
                        newMessage_1.del();
                    }, 1000 * 5);
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, sendButtons(guild, channel, member.id)];
                case 3:
                    _a = _b.sent(), emoji = _a.emoji, text = _a.text;
                    if (!emoji || !text) {
                        return [2 /*return*/];
                    }
                    status = exports.statusMessages.WAITING;
                    embed = new discord_js_1.MessageEmbed()
                        .setColor(status.color)
                        .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL() })
                        .setDescription(content)
                        .addFields({
                        name: "Statut",
                        value: status.text,
                    }, {
                        name: "Type de suggestion",
                        value: "".concat(emoji, " ").concat(text),
                    })
                        .setFooter({ text: "Vous voulez suggérer quelque chose ? Il suffit de le taper dans ce salon !" });
                    return [4 /*yield*/, channel.send({
                            embeds: [embed],
                        })];
                case 4:
                    newMessage = _b.sent();
                    newMessage.react("👍").then(function () {
                        newMessage.react("👎");
                    });
                    return [4 /*yield*/, new suggestions_schema_1.default({
                            _id: newMessage.id,
                            memberId: member.id,
                        }).save()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
exports.statusMessages = {
    WAITING: {
        text: "📊 En attente des réactions de la communauté, veuillez voter !",
        color: 0xffea00,
        emoji: "📊",
    },
    ACCEPTED: {
        text: "Acceptée! ✅",
        color: 0x34eb5b,
        emoji: "✅",
    },
    DENIED: {
        text: "Refusée! ❌ Nous vous remercions de votre suggestion, mais nous ne sommes pas intéressés par cette idée pour le moment.",
        color: 0xc20808,
        emoji: "❌",
    },
    COMINGSOON: {
        text: "Coming Soon! 👀",
        color: 0x3d85c6,
        emoji: "👀",
    },
};
exports.config = {
    dbName: "SUGGESTIONS",
    displayName: "Suggestions",
};
