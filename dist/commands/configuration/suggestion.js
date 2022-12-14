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
var suggestions_1 = require("../../features/suggestions");
var ids_1 = __importDefault(require("../../util/ids"));
var channel;
var validActions = ["accepted", "denied", "waiting", "comingsoon"];
exports.default = {
    category: "Configuration",
    description: "Accepter ou refuser une suggestion",
    slash: "both",
    testOnly: true,
    guildOnly: true,
    permissions: ["ADMINISTRATOR"],
    options: [
        {
            name: "message-id",
            description: "L'ID de la suggestion.",
            required: true,
            type: "STRING",
        },
        {
            name: "nouveau-statut",
            description: "Le nouveau statut de la suggestion.",
            required: true,
            type: "STRING",
            choices: [
                { name: "??? Accept??e", value: "accepted" },
                { name: "??? Refus??e", value: "denied" },
                { name: "???? En Attente", value: "waiting" },
                { name: "???? Coming Soon", value: "comingsoon" },
            ],
        },
        {
            name: "text",
            description: "Une r??ponse simple pour cette suggestion.",
            required: false,
            type: "STRING",
        },
    ],
    init: function (client) {
        var guild = client.guilds.cache.get(ids_1.default.GUILD);
        if (guild) {
            channel = guild.channels.cache.get(ids_1.default.SUGGESTIONS_CHANNEL);
            channel.messages.fetch();
        }
    },
    callback: function (_a) {
        var interaction = _a.interaction, guild = _a.guild, args = _a.args;
        return __awaiter(void 0, void 0, void 0, function () {
            var response, messageId, status, notes, newStatus, target;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        response = function (msg) {
                            return ({
                                content: msg,
                                custom: true,
                                allowedMentions: {
                                    roles: [],
                                    users: [],
                                },
                            });
                        };
                        if (!interaction)
                            return [2 /*return*/, response("La commande ?? prefix est d??sactiv??e, veuillez utiliser la commande slash.")];
                        messageId = interaction.options.getString("message-id") || "";
                        status = ((_b = interaction.options.getString("nouveau-statut")) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || "";
                        notes = interaction.options.getString("text") || "";
                        newStatus = suggestions_1.statusMessages[status];
                        if (!newStatus) {
                            return [2 /*return*/, "Statut inconnu \"".concat(status, "\", veuillez utiliser ").concat(Object.keys(suggestions_1.statusMessages))];
                        }
                        return [4 /*yield*/, channel.messages.fetch(messageId, {
                                cache: true,
                                force: true,
                            })];
                    case 1:
                        target = _c.sent();
                        if (!target) {
                            return [2 /*return*/, "Message inconnu."];
                        }
                        if (newStatus.emoji === "???") {
                            (0, suggestions_1.updateSuggestion)(guild, target, suggestions_1.statusMessages.ACCEPTED, notes);
                        }
                        else if (newStatus.emoji === "???") {
                            (0, suggestions_1.updateSuggestion)(guild, target, suggestions_1.statusMessages.DENIED, notes);
                        }
                        else if (newStatus.emoji === "????") {
                            (0, suggestions_1.updateSuggestion)(guild, target, suggestions_1.statusMessages.WAITING, notes);
                        }
                        else if (newStatus.emoji === "????") {
                            (0, suggestions_1.updateSuggestion)(guild, target, suggestions_1.statusMessages.COMINGSOON, notes);
                        }
                        return [2 /*return*/, "Suggestion mise ?? jour."];
                }
            });
        });
    },
};
