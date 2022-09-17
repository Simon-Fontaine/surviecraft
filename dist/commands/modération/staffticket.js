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
var ids_1 = __importDefault(require("../../util/ids"));
var staff_ticket_schema_1 = __importDefault(require("../../models/staff-ticket-schema"));
var highstaff_util_1 = require("../../util/highstaff-util");
exports.default = {
    category: "Modération",
    description: "Effectue des actions rapide sur un staff ticket.",
    slash: true,
    testOnly: true,
    guildOnly: true,
    options: [
        {
            name: "action",
            type: "STRING",
            description: "Ajouter ou supprimer un membre de ce ticket.",
            required: true,
            choices: [
                { name: "➕ Add", value: "add" },
                { name: "➖ Remove", value: "remove" },
                { name: "❌ Close", value: "close" },
            ],
        },
        {
            name: "user",
            type: "USER",
            description: "Choisissez un membre",
            required: false,
        },
    ],
    callback: function (_a) {
        var member = _a.member, client = _a.client, interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var guildId, options, channel, Action, Member, guild, ticketChannel, Embed;
            return __generator(this, function (_b) {
                if (!(0, highstaff_util_1.isHighStaff)(member)) {
                    return [2 /*return*/, interaction.reply({
                            content: "Vous ne pouvez pas utiliser cette commande, vous ne faites pas partie du staff.",
                            ephemeral: true,
                        })];
                }
                guildId = interaction.guildId, options = interaction.options, channel = interaction.channel;
                Action = options.getString("action");
                Member = options.getMember("user");
                guild = client.guilds.cache.get(ids_1.default.GUILD);
                if (!guild) {
                    return [2 /*return*/];
                }
                ticketChannel = guild.channels.cache.get(channel.id);
                if (!ticketChannel) {
                    return [2 /*return*/];
                }
                Embed = new discord_js_1.MessageEmbed();
                switch (Action) {
                    case "close":
                        staff_ticket_schema_1.default.findOne({ GuildID: guildId, ChannelID: channel.id }, function (err, docs) { return __awaiter(void 0, void 0, void 0, function () {
                            var modal, raison, firstActionRow;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err)
                                            throw err;
                                        if (!docs)
                                            return [2 /*return*/, interaction.reply({
                                                    embeds: [Embed.setColor("RED").setDescription("⛔ | Ce salon n'est pas un staff ticket.")],
                                                    ephemeral: true,
                                                })];
                                        if (docs.Closed == true)
                                            return [2 /*return*/, interaction.reply({
                                                    content: "Le ticket est déjà fermé, veuillez attendre qu'il soit supprimé.",
                                                    ephemeral: true,
                                                })];
                                        modal = new discord_js_1.Modal().setCustomId("staffCloseModal").setTitle("Fermeture du ticket.");
                                        raison = new discord_js_1.TextInputComponent()
                                            .setCustomId("raison")
                                            .setLabel("📝 Indiquez nous une raison.")
                                            .setStyle("SHORT")
                                            .setPlaceholder("Ticket Résolu, Ticket Inactif, etc")
                                            .setRequired(true);
                                        firstActionRow = new discord_js_1.MessageActionRow().addComponents(raison);
                                        // @ts-ignore
                                        modal.addComponents(firstActionRow);
                                        return [4 /*yield*/, interaction.showModal(modal)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        break;
                    case "add":
                        if (!Member) {
                            return [2 /*return*/, interaction.reply({
                                    embeds: [Embed.setColor("RED").setDescription("⛔ | Veuillez mentionner un membre!")],
                                    ephemeral: true,
                                })];
                        }
                        staff_ticket_schema_1.default.findOne({ GuildID: guildId, ChannelID: channel.id }, function (err, docs) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (err)
                                    throw err;
                                if (!docs)
                                    return [2 /*return*/, interaction.reply({
                                            embeds: [Embed.setColor("RED").setDescription("⛔ | Ce salon n'est pas un staff ticket.")],
                                            ephemeral: true,
                                        })];
                                if (docs.MembersID.includes(Member.user.id))
                                    return [2 /*return*/, interaction.reply({
                                            embeds: [Embed.setColor("RED").setDescription("⛔ | Ce membre est déjà ajouté à ce staff ticket.")],
                                            ephemeral: true,
                                        })];
                                docs.MembersID.push(Member.user.id);
                                ticketChannel.permissionOverwrites.edit(Member.user.id, {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true,
                                    READ_MESSAGE_HISTORY: true,
                                });
                                interaction.reply({
                                    embeds: [Embed.setColor("GREEN").setDescription("\u2705 | ".concat(Member, " a \u00E9t\u00E9 ajout\u00E9 \u00E0 ce staff ticket."))],
                                });
                                docs.save();
                                return [2 /*return*/];
                            });
                        }); });
                        break;
                    case "remove":
                        if (!Member) {
                            return [2 /*return*/, interaction.reply({
                                    embeds: [Embed.setColor("RED").setDescription("⛔ | Veuillez mentionner un membre!")],
                                    ephemeral: true,
                                })];
                        }
                        staff_ticket_schema_1.default.findOne({ GuildID: guildId, ChannelID: channel.id }, function (err, docs) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (err)
                                    throw err;
                                if (!docs)
                                    return [2 /*return*/, interaction.reply({
                                            embeds: [Embed.setColor("RED").setDescription("⛔ | Ce salon n'est pas un staff ticket.")],
                                            ephemeral: true,
                                        })];
                                if (!docs.MembersID.includes(Member.user.id))
                                    return [2 /*return*/, interaction.reply({
                                            embeds: [Embed.setColor("RED").setDescription("⛔ | Ce membre n'est pas ajouté à ce staff ticket.")],
                                            ephemeral: true,
                                        })];
                                docs.MembersID.remove(Member.id);
                                ticketChannel.permissionOverwrites.edit(Member.user.id, {
                                    SEND_MESSAGES: false,
                                    VIEW_CHANNEL: false,
                                    READ_MESSAGE_HISTORY: false,
                                });
                                interaction.reply({
                                    embeds: [Embed.setColor("GREEN").setDescription("\u2705 | ".concat(Member, " a \u00E9t\u00E9 supprim\u00E9 de ce staff ticket."))],
                                });
                                docs.save();
                                return [2 /*return*/];
                            });
                        }); });
                        break;
                }
                return [2 /*return*/];
            });
        });
    },
};
