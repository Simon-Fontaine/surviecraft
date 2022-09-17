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
var discord_js_1 = require("discord.js");
var staff_util_1 = require("../../util/staff-util");
var ids_1 = __importDefault(require("../../util/ids"));
exports.default = {
    category: "Modération",
    description: "Unmute l'utilisateur spécifié.",
    minArgs: 2,
    expectedArgs: "<target> <reason>",
    expectedArgsTypes: ["USER", "STRING"],
    slash: "both",
    testOnly: true,
    guildOnly: true,
    callback: function (_a) {
        var client = _a.client, member = _a.member, message = _a.message, interaction = _a.interaction, channel = _a.channel, args = _a.args, user = _a.user;
        return __awaiter(void 0, void 0, void 0, function () {
            var target, argId, id, reason, guild, ignored_1, authorId, cache, content, components, newMessage, filter, collector;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(0, staff_util_1.isStaff)(member)) {
                            return [2 /*return*/, "Vous ne pouvez pas utiliser cette commande, vous ne faites pas partie du staff."];
                        }
                        if (message) {
                            target = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
                        }
                        else {
                            target = interaction.options.getMember("target");
                        }
                        argId = args.shift();
                        id = (target === null || target === void 0 ? void 0 : target.id) || argId || "";
                        reason = (message ? args.join(" ") : interaction.options.getString("reason")) || "Aucune raison spécifiée";
                        guild = channel.guild;
                        if (!!target) return [3 /*break*/, 4];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        target = guild.members.cache.get(id);
                        if (!target && id.startsWith("<@!") && id.endsWith(">")) {
                            id = id.substring(3, id.length - 1);
                        }
                        return [4 /*yield*/, client.users.fetch(id)];
                    case 2:
                        target = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ignored_1 = _c.sent();
                        return [2 /*return*/, "Utilisateur inconnu."];
                    case 4:
                        authorId = user.id;
                        if (authorId === id) {
                            return [2 /*return*/, "Vous ne pouvez pas vous unmute vous-même."];
                        }
                        if (target instanceof discord_js_1.GuildMember) {
                            if (!target.bannable) {
                                return [2 /*return*/, "Vous ne pouvez pas unmute cet utilisateur."];
                            }
                            cache = target.roles.cache;
                            if (cache.has(ids_1.default.MODO_ROLE) ||
                                cache.has(ids_1.default.SUPERMODO_ROLE) ||
                                cache.has(ids_1.default.DEV_ROLE) ||
                                cache.has(ids_1.default.RESP_ROLE) ||
                                cache.has(ids_1.default.ADMIN_ROLE)) {
                                return [2 /*return*/, "Vous ne pouvez pas unmute un membre du staff."];
                            }
                        }
                        content = "\u00CAtes-vous s\u00FBr de vouloir unmute <@".concat(id, ">?");
                        components = [
                            new discord_js_1.MessageActionRow()
                                .addComponents(new discord_js_1.MessageButton().setCustomId("ban_yes").setLabel("Oui").setStyle("SUCCESS"))
                                .addComponents(new discord_js_1.MessageButton().setCustomId("ban_no").setLabel("Non").setStyle("DANGER")),
                        ];
                        if (!message) return [3 /*break*/, 6];
                        return [4 /*yield*/, message.reply({
                                content: content,
                                components: components,
                                allowedMentions: {
                                    users: [],
                                },
                            })];
                    case 5:
                        newMessage = _c.sent();
                        // @ts-ignore
                        message.del();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, interaction.reply({
                            content: content,
                            components: components,
                            allowedMentions: {
                                users: [],
                            },
                            ephemeral: true,
                        })];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        filter = function (btnInt) { return btnInt.user.id === authorId; };
                        collector = channel.createMessageComponentCollector({
                            filter: filter,
                            max: 1,
                            time: 1000 * 10,
                        });
                        collector.on("end", function (collected) { return __awaiter(void 0, void 0, void 0, function () {
                            var button, content, MPembed, modLogChannel_1, embed;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        button = collected.first();
                                        if (!!button) return [3 /*break*/, 2];
                                        return [4 /*yield*/, channel.send({
                                                content: "<@".concat(authorId, "> vous n'avez pas s\u00E9lectionn\u00E9 une action \u00E0 temps. Veuillez ex\u00E9cuter \u00E0 nouveau la commande de unmute."),
                                            })];
                                    case 1:
                                        _b.sent();
                                        if (newMessage) {
                                            // @ts-ignore
                                            newMessage.del();
                                        }
                                        return [2 /*return*/];
                                    case 2:
                                        content = "\u274C <@".concat(id, "> n'a pas \u00E9t\u00E9 unmute.");
                                        if (!(button.customId === "ban_yes")) return [3 /*break*/, 5];
                                        MPembed = new discord_js_1.MessageEmbed()
                                            .setTitle("SurvieCraft - Sanction")
                                            .setDescription(["Attention, vous \u00EAtes fait unmute !", "**Raison:** ".concat(reason)].join("\n"))
                                            .setFields([
                                            {
                                                name: "Sanction réduite par",
                                                value: "<@".concat(authorId, ">"),
                                                inline: true,
                                            },
                                        ])
                                            .setFooter({
                                            text: "Ne r\u00E9p\u00E9tez pas ces actions! Si vous le faites, d'autres sanctions suivront!",
                                        });
                                        return [4 /*yield*/, ((_a = client.users.cache
                                                .get(id)) === null || _a === void 0 ? void 0 : _a.send({
                                                embeds: [MPembed],
                                            }).catch(function () {
                                                if (modLogChannel_1) {
                                                    modLogChannel_1.send({
                                                        content: "L'utilisateur n'a pas été averti par MP, ils sont fermé.",
                                                        allowedMentions: {
                                                            users: [],
                                                        },
                                                    });
                                                }
                                            }))];
                                    case 3:
                                        _b.sent();
                                        return [4 /*yield*/, guild.members.cache
                                                .get(id)
                                                .timeout(null, reason)
                                                .catch(function () {
                                                return "Veillez @user pour sélectionner l'utilisateur";
                                            })];
                                    case 4:
                                        _b.sent();
                                        content = "\u2705 <@".concat(id, "> a \u00E9t\u00E9 unmute avec succ\u00E8s.");
                                        modLogChannel_1 = guild.channels.cache.get(ids_1.default.MOD_LOGS_CHANNEL);
                                        if (modLogChannel_1) {
                                            embed = new discord_js_1.MessageEmbed()
                                                .setTitle("Utilisateur Unmute du Serveur")
                                                .setColor("RED")
                                                .setDescription("**Raison**\n\"".concat(reason, "\""))
                                                .setFields([
                                                {
                                                    name: "Staff",
                                                    value: "<@".concat(authorId, ">"),
                                                    inline: true,
                                                },
                                                {
                                                    name: "Utilisateur",
                                                    value: "<@".concat(id, ">"),
                                                    inline: true,
                                                },
                                            ]);
                                            modLogChannel_1.send({
                                                embeds: [embed],
                                                allowedMentions: {
                                                    users: [],
                                                },
                                            });
                                        }
                                        _b.label = 5;
                                    case 5:
                                        button.reply({
                                            content: content,
                                            allowedMentions: {
                                                users: [],
                                            },
                                            ephemeral: true,
                                        });
                                        if (newMessage) {
                                            // @ts-ignore
                                            newMessage.del();
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    },
};
