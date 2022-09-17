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
var ids_1 = __importDefault(require("../../../util/ids"));
var staff_util_1 = require("../../../util/staff-util");
var staff_ticket_schema_1 = __importDefault(require("../../../models/staff-ticket-schema"));
exports.default = (function (client) {
    client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
        var guild, customId, channel, member, transcriptChannel, ticketChannel, embed;
        return __generator(this, function (_a) {
            if (!interaction.isButton()) {
                return [2 /*return*/];
            }
            guild = client.guilds.cache.get(ids_1.default.GUILD);
            if (!guild) {
                return [2 /*return*/];
            }
            customId = interaction.customId, channel = interaction.channel, member = interaction.member;
            if (!["staffclose", "stafflock", "staffunlock", "staffclaim"].includes(customId))
                return [2 /*return*/];
            if (!(0, staff_util_1.isStaff)(member)) {
                return [2 /*return*/, interaction.reply({
                        content: "Vous ne pouvez pas utiliser ces boutons, vous ne faites pas partie du Staff.",
                        ephemeral: true,
                    })];
            }
            transcriptChannel = guild.channels.cache.get(ids_1.default.STAFF_TICKET_TRANSCRIPT);
            if (!transcriptChannel) {
                return [2 /*return*/];
            }
            ticketChannel = guild.channels.cache.get(channel.id);
            if (!ticketChannel) {
                return [2 /*return*/];
            }
            embed = new discord_js_1.MessageEmbed();
            staff_ticket_schema_1.default.findOne({ ChannelID: channel.id }, function (err, docs) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, modal, raison, firstActionRow;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (err)
                                throw err;
                            if (!docs)
                                return [2 /*return*/, interaction.reply({
                                        content: "Aucune donnée n'a été trouvée concernant ce ticket, veuillez le supprimer manuellement.",
                                        ephemeral: true,
                                    })];
                            _a = customId;
                            switch (_a) {
                                case "stafflock": return [3 /*break*/, 1];
                                case "staffunlock": return [3 /*break*/, 3];
                                case "staffclose": return [3 /*break*/, 5];
                                case "staffclaim": return [3 /*break*/, 7];
                            }
                            return [3 /*break*/, 9];
                        case 1:
                            if (docs.Locked == true)
                                return [2 /*return*/, interaction.reply({
                                        content: "Ce ticket est déjà verrouillé.",
                                        ephemeral: true,
                                    })];
                            return [4 /*yield*/, staff_ticket_schema_1.default.updateOne({ ChannelID: channel.id }, { Locked: true })];
                        case 2:
                            _b.sent();
                            embed.setDescription("🔒 | Ce ticket est maintenant verrouillé pour être examiné.");
                            docs.MembersID.forEach(function (m) {
                                ticketChannel.permissionOverwrites.edit(m, {
                                    SEND_MESSAGES: false,
                                });
                            });
                            interaction.reply({ embeds: [embed] });
                            return [3 /*break*/, 9];
                        case 3:
                            if (docs.Locked == false)
                                return [2 /*return*/, interaction.reply({
                                        content: "Ce ticket est déjà déverrouillé.",
                                        ephemeral: true,
                                    })];
                            return [4 /*yield*/, staff_ticket_schema_1.default.updateOne({ ChannelID: channel.id }, { Locked: false })];
                        case 4:
                            _b.sent();
                            embed.setDescription("🔓 | Ce ticket est maintenant déverrouillé.");
                            docs.MembersID.forEach(function (m) {
                                ticketChannel.permissionOverwrites.edit(m, {
                                    SEND_MESSAGES: true,
                                });
                            });
                            interaction.reply({ embeds: [embed] });
                            return [3 /*break*/, 9];
                        case 5:
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
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 7:
                            if (docs.Claimed == true)
                                return [2 /*return*/, interaction.reply({
                                        content: "Ce ticket a d\u00E9j\u00E0 \u00E9t\u00E9 pris en charge par ".concat(docs.ClaimedBy),
                                        ephemeral: true,
                                    })];
                            return [4 /*yield*/, staff_ticket_schema_1.default.updateOne({ ChannelID: channel.id }, 
                                // @ts-ignore
                                { Claimed: true, ClaimedBy: "".concat(member.user.tag, " (||").concat(member.user.id, "||)") })];
                        case 8:
                            _b.sent();
                            embed.setDescription("\uD83D\uDE4B\u200D\u2642\uFE0F | Ce ticket a \u00E9t\u00E9 pris en charge, vous allez maintenant \u00EAtre assist\u00E9 par ".concat(member));
                            interaction.reply({ embeds: [embed] });
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
exports.config = {
    dbName: "TICKET_JOUEUR",
    displayName: "Ticket Joueur",
};
