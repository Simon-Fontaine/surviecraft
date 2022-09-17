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
var discord_html_transcripts_1 = require("discord-html-transcripts");
var ids_1 = __importDefault(require("../../../util/ids"));
var staff_util_1 = require("../../../util/staff-util");
var ticket_schema_1 = __importDefault(require("../../../models/ticket-schema"));
exports.default = (function (client) {
    client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
        var guild, customId, channel, member, raison, transcriptChannel, ticketChannel, embed;
        return __generator(this, function (_a) {
            if (!interaction.isModalSubmit()) {
                return [2 /*return*/];
            }
            guild = client.guilds.cache.get(ids_1.default.GUILD);
            if (!guild) {
                return [2 /*return*/];
            }
            customId = interaction.customId, channel = interaction.channel, member = interaction.member;
            if (!["closeModal"].includes(customId))
                return [2 /*return*/];
            if (!(0, staff_util_1.isStaff)(member)) {
                return [2 /*return*/, interaction.reply({
                        content: "Vous ne pouvez pas utiliser ces boutons, vous ne faites pas partie du Staff.",
                        ephemeral: true,
                    })];
            }
            raison = interaction.fields.getTextInputValue("raison");
            transcriptChannel = guild.channels.cache.get(ids_1.default.TICKET_TRANSCRIPT);
            if (!transcriptChannel) {
                return [2 /*return*/];
            }
            ticketChannel = guild.channels.cache.get(channel.id);
            if (!ticketChannel) {
                return [2 /*return*/];
            }
            embed = new discord_js_1.MessageEmbed();
            ticket_schema_1.default.findOne({ ChannelID: channel.id }, function (err, docs) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, attachment, Message_1, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
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
                                case "closeModal": return [3 /*break*/, 1];
                            }
                            return [3 /*break*/, 9];
                        case 1:
                            if (docs.Closed == true)
                                return [2 /*return*/, interaction.reply({
                                        content: "Le ticket est déjà fermé, veuillez attendre qu'il soit supprimé.",
                                        ephemeral: true,
                                    })];
                            return [4 /*yield*/, (0, discord_html_transcripts_1.createTranscript)(ticketChannel, {
                                    limit: -1,
                                    returnBuffer: false,
                                    fileName: "".concat(docs.Type, " + ").concat(docs.TicketID, ".html"),
                                })];
                        case 2:
                            attachment = _d.sent();
                            return [4 /*yield*/, ticket_schema_1.default.updateOne({ ChannelID: channel.id }, { Closed: true })];
                        case 3:
                            _d.sent();
                            return [4 /*yield*/, transcriptChannel.send({
                                    embeds: [
                                        embed.setTitle("Ticket \"".concat(docs.Type, "\" #").concat(docs.TicketID)).addFields([
                                            {
                                                name: "Fermé par",
                                                // @ts-ignore
                                                value: "".concat(member.user.tag, " (||").concat(member.user.id, "||)"),
                                                inline: true,
                                            },
                                            {
                                                name: "Raison",
                                                value: raison,
                                                inline: true,
                                            },
                                            {
                                                name: "Ouvert par",
                                                value: "".concat(docs.TicketOwner[0]),
                                                inline: true,
                                            },
                                            {
                                                name: "Heure d'ouverture",
                                                value: "".concat(docs.createdAt.toLocaleString()),
                                                inline: true,
                                            },
                                            {
                                                name: "Heure de fermeture",
                                                value: "".concat(new Date().toLocaleString()),
                                                inline: true,
                                            },
                                            {
                                                name: "Pris en charge par",
                                                value: "".concat(docs.ClaimedBy === "Aucun" ? "Pas pris en charge" : "".concat(docs.ClaimedBy)),
                                                inline: true,
                                            },
                                        ]),
                                    ],
                                    files: [attachment],
                                })];
                        case 4:
                            Message_1 = _d.sent();
                            _d.label = 5;
                        case 5:
                            _d.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, ((_c = client.users.cache.get(docs.MembersID[0])) === null || _c === void 0 ? void 0 : _c.send({
                                    embeds: [
                                        embed.setFooter({
                                            text: "Pour revoir l'étendue de votre ticket, téléchargez-le puis ouvrer-le dans votre navigateur.",
                                        }),
                                    ],
                                    files: [attachment],
                                }))];
                        case 6:
                            _d.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            _b = _d.sent();
                            transcriptChannel.send("Je n'ai pas pu informer ".concat(docs.TicketOwner[0], " de la fermeture de son ticket (MP ferm\u00E9)"));
                            return [3 /*break*/, 8];
                        case 8:
                            interaction.reply({
                                embeds: [embed.setDescription("La transcription est maintenant sauvegard\u00E9e [TRANSCRIPT](".concat(Message_1.url, ")"))],
                            });
                            setTimeout(function () {
                                ticketChannel.delete();
                            }, 10 * 1000);
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
