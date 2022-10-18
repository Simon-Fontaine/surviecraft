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
var ticket_joueur_schema_1 = __importDefault(require("../../../models/ticket-joueur-schema"));
var ticket_schema_1 = __importDefault(require("../../../models/ticket-schema"));
var ids_1 = __importDefault(require("../../../util/ids"));
exports.default = (function (client, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var guild, channel, discordEmoji, results, rows, text, embed, message, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!instance.isDBConnected()) {
                    return [2 /*return*/];
                }
                guild = client.guilds.cache.get(ids_1.default.GUILD);
                if (!guild) {
                    return [2 /*return*/];
                }
                channel = guild.channels.cache.get(ids_1.default.TICKET_CHANNEL);
                if (!channel) {
                    return [2 /*return*/];
                }
                discordEmoji = guild.emojis.cache.find(function (emoji) { return emoji.name === "discord"; });
                if (!discordEmoji) {
                    throw new Error("Could not find the Discord emoji.");
                }
                return [4 /*yield*/, ticket_joueur_schema_1.default.findById(guild.id)];
            case 1:
                results = _a.sent();
                rows = [];
                text = "Après avoir cliqué sur la réaction, merci de préciser votre **problème** en jeu et votre **pseudo**.\n\n*Tous les tickets dont nous n'avons pas de réponses de votre part sous 24h seront automatiquement fermés.*\n\nComment présenter son ticket:\n> **SERVEUR/PSEUDO/PROBLÈME et/ou QUESTION**";
                embed = new discord_js_1.MessageEmbed()
                    .setTitle("Un Problème? Ouvre un Ticket!")
                    .setDescription([
                    "🔆 **Comment crée un Support-Ticket?**",
                    "Pour pouvoir discuter avec des membres du staff merci de cliquer sur la réaction ci-dessous.",
                    "",
                    "⛔ *Tous abus de cette fonctionnalité sera sanctionable par notre équipe.*",
                ].join("\n"));
                rows.push(new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton().setCustomId("Problèmes en Jeu").setLabel("Problèmes en Jeu").setEmoji("🌄").setStyle("SUCCESS"), new discord_js_1.MessageButton().setCustomId("Problèmes Boutique").setLabel("Problèmes Boutique").setEmoji("🖥").setStyle("DANGER"), new discord_js_1.MessageButton().setCustomId("Problèmes Discord").setLabel("Problèmes Discord").setEmoji(discordEmoji).setStyle("PRIMARY"), new discord_js_1.MessageButton().setCustomId("Problèmes Mot De Passe").setLabel("Problèmes Mot De Passe").setEmoji("🔐").setStyle("SECONDARY")));
                if (!results) return [3 /*break*/, 3];
                return [4 /*yield*/, channel.messages
                        .fetch(results.messageId, {
                        cache: true,
                        force: true,
                    })
                        .catch(function () { })];
            case 2:
                message = (_a.sent());
                if (message) {
                    message.edit({
                        content: text,
                        embeds: [embed],
                        components: rows,
                    });
                }
                else {
                    results = null;
                }
                _a.label = 3;
            case 3:
                if (!!results) return [3 /*break*/, 6];
                return [4 /*yield*/, channel.send({
                        content: text,
                        embeds: [embed],
                        components: rows,
                    })];
            case 4:
                message = _a.sent();
                return [4 /*yield*/, ticket_joueur_schema_1.default.findOneAndUpdate({
                        _id: guild.id,
                    }, {
                        _id: guild.id,
                        messageId: message.id,
                    }, {
                        upsert: true,
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
                    var customId, member, ID;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!interaction.isButton() || interaction.channelId !== ids_1.default.TICKET_CHANNEL) {
                                    return [2 /*return*/];
                                }
                                customId = interaction.customId, member = interaction.member;
                                if (!["Problèmes en Jeu", "Problèmes Boutique", "Problèmes Discord", "Problèmes Mot De Passe"].includes(customId))
                                    return [2 /*return*/];
                                if (guild.channels.cache.find(function (channel) { return channel.topic === member.user.id + "-j"; })) {
                                    return [2 /*return*/, interaction.reply({
                                            content: "Attentions ".concat(member, "! Tu as d\u00E9j\u00E0 un ticket ouvert!"),
                                            ephemeral: true,
                                        })];
                                }
                                return [4 /*yield*/, ticket_schema_1.default.countDocuments({
                                        GuildID: guild.id,
                                    })];
                            case 1:
                                ID = (_a.sent()) + 1;
                                return [4 /*yield*/, guild.channels
                                        .create("".concat(ID + "-" + member.user.username), {
                                        type: "GUILD_TEXT",
                                        topic: member.user.id + "-j",
                                        parent: ids_1.default.TICKET_CATEGORY,
                                        permissionOverwrites: [
                                            {
                                                id: member.user.id,
                                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                                            },
                                            {
                                                id: ids_1.default.GUIDE_ROLE,
                                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                                            },
                                            {
                                                id: ids_1.default.DEV_ROLE,
                                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                                            },
                                            {
                                                id: ids_1.default.MODO_ROLE,
                                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "MANAGE_CHANNELS"],
                                            },
                                            {
                                                id: ids_1.default.ADMIN_ROLE,
                                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "MANAGE_CHANNELS"],
                                            },
                                            {
                                                id: ids_1.default.RESP_ROLE,
                                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "MANAGE_CHANNELS"],
                                            },
                                            {
                                                id: ids_1.default.SUPERMODO_ROLE,
                                                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "MANAGE_CHANNELS"],
                                            },
                                            {
                                                id: ids_1.default.EVERYONE_ROLE,
                                                deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                                            },
                                        ],
                                    })
                                        .then(function (channel) { return __awaiter(void 0, void 0, void 0, function () {
                                        var embed, Buttons;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, ticket_schema_1.default.create({
                                                        GuildID: guild.id,
                                                        // @ts-ignore
                                                        TicketOwner: "".concat(member.user.tag, " (||").concat(member.user.id, "||)"),
                                                        MembersID: member.user.id,
                                                        TicketID: ID,
                                                        ChannelID: channel.id,
                                                        Closed: false,
                                                        Locked: false,
                                                        Type: customId,
                                                        Claimed: false,
                                                        ClaimedBy: "Aucun",
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    embed = new discord_js_1.MessageEmbed()
                                                        // @ts-ignore
                                                        .setTitle("Ticket de ".concat(member.user.tag))
                                                        .setDescription([
                                                        "".concat(member, ", vous venez de cr\u00E9er un ticket \"`").concat(customId, "`\". Nous vous **invitons** \u00E0 nous informer des informations suivante:"),
                                                        "",
                                                        "> **SERVEUR/PSEUDO/PROBLÈME et/ou QUESTION**",
                                                        "",
                                                        "*Un membre du staff a été averti de la création de ce ticket.*",
                                                    ].join("\n"))
                                                        .setColor("GREEN");
                                                    Buttons = new discord_js_1.MessageActionRow();
                                                    Buttons.addComponents(new discord_js_1.MessageButton().setCustomId("close").setLabel("Sauvegarder & Fermer").setStyle("PRIMARY").setEmoji("💾"), new discord_js_1.MessageButton().setCustomId("lock").setLabel("").setStyle("DANGER").setEmoji("🔒"), new discord_js_1.MessageButton().setCustomId("unlock").setLabel("").setStyle("SUCCESS").setEmoji("🔓"), new discord_js_1.MessageButton().setCustomId("claim").setLabel("Claim").setStyle("PRIMARY").setEmoji("🙋‍♂️"));
                                                    return [4 /*yield*/, channel
                                                            .send({
                                                            content: "<@&".concat(ids_1.default.GUIDE_ROLE, "> <@&").concat(ids_1.default.MODO_ROLE, "> <@&").concat(ids_1.default.SUPERMODO_ROLE, ">"),
                                                            allowedMentions: {
                                                                roles: [ids_1.default.GUIDE_ROLE, ids_1.default.MODO_ROLE, ids_1.default.SUPERMODO_ROLE],
                                                            },
                                                        })
                                                            .then(function (m) {
                                                            setTimeout(function () {
                                                                m.delete().catch(function () { });
                                                            }, 1 * 5000);
                                                        })];
                                                case 2:
                                                    _a.sent();
                                                    return [4 /*yield*/, channel
                                                            .send({
                                                            content: "".concat(member, ", voici ton nouveau ticket."),
                                                            allowedMentions: {
                                                                users: [member.user.id],
                                                            },
                                                        })
                                                            .then(function (m) {
                                                            setTimeout(function () {
                                                                m.delete().catch(function () { });
                                                            }, 1 * 5000);
                                                        })];
                                                case 3:
                                                    _a.sent();
                                                    channel.send({
                                                        embeds: [embed],
                                                        components: [Buttons],
                                                    });
                                                    interaction.reply({
                                                        content: "".concat(member, " votre ticket a \u00E9t\u00E9 cr\u00E9\u00E9 : ").concat(channel),
                                                        ephemeral: true,
                                                        allowedMentions: {
                                                            users: [],
                                                        },
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
exports.config = {
    dbName: "TICKET_JOUEUR",
    displayName: "Ticket Joueur",
};
