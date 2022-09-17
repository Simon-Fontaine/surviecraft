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
var ids_1 = __importDefault(require("../../util/ids"));
exports.default = {
    category: "Premium",
    description: "Permet aux Youtubeur/Streamer de facilement créer une annonce.",
    cooldown: "6h",
    slash: true,
    testOnly: true,
    guildOnly: true,
    options: [
        {
            type: "SUB_COMMAND",
            name: "stream",
            description: "Créé une annonce à propos de ton live",
            options: [
                {
                    name: "description",
                    type: "STRING",
                    description: "Donne un peu plus d'information sur ton stream",
                    required: true,
                },
                {
                    name: "lien",
                    type: "STRING",
                    description: "Donne le lien de ta chaîne Twitch",
                    required: true,
                },
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "video",
            description: "Créé une annonce à propos de ta vidéo Youtube",
            options: [
                {
                    name: "description",
                    type: "STRING",
                    description: "Donne un peu plus d'information sur ton stream",
                    required: true,
                },
                {
                    name: "lien",
                    type: "STRING",
                    description: "Donne le lien de ta nouvelle vidéo",
                    required: true,
                },
            ],
        },
    ],
    callback: function (_a) {
        var guild = _a.guild, member = _a.member, interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var subCommand, description, lien, annonceChannel, content, annonceChannel, content;
            return __generator(this, function (_b) {
                if (!guild || !member) {
                    return [2 /*return*/];
                }
                subCommand = interaction.options.getSubcommand();
                description = interaction.options.getString("description");
                lien = interaction.options.getString("lien");
                if (subCommand === "stream") {
                    if (!member.roles.cache.has(ids_1.default.STREAMER_ROLE)) {
                        return [2 /*return*/, interaction.reply({
                                content: "Vous devez avoir le role <@&".concat(ids_1.default.STREAMER_ROLE, "> pour utiliser cette commande!"),
                                ephemeral: true,
                            })];
                    }
                    annonceChannel = guild.channels.cache.get(ids_1.default.VIDEO_AND_STREAM_CHANNEL);
                    if (!annonceChannel) {
                        return [2 /*return*/];
                    }
                    content = [
                        "\uD83D\uDCFA Live - ".concat(interaction.member, " est **actuellement en live** sur SurvieCraft !"),
                        "\uD83D\uDD17 ".concat(lien),
                        "",
                        "\u2753 Description: ".concat(description),
                        "",
                        "<@&".concat(ids_1.default.YT_NOTIFICATIONS_ROLE, ">"),
                    ].join("\n");
                    annonceChannel.send({
                        content: content,
                        allowedMentions: {
                            roles: ["".concat(ids_1.default.YT_NOTIFICATIONS_ROLE)],
                        },
                    });
                    annonceChannel.send({
                        content: "━━━━━━━━━━━━━━━━━━━━━━━━",
                    });
                    return [2 /*return*/, interaction.reply({ content: "Votre annonce a \u00E9t\u00E9 envoy\u00E9e dans <#".concat(ids_1.default.VIDEO_AND_STREAM_CHANNEL, ">"), ephemeral: true })];
                }
                else if (subCommand === "video") {
                    if (!member.roles.cache.has(ids_1.default.YOUTUBEUR_ROLE)) {
                        return [2 /*return*/, "Vous devez avoir le role <@&".concat(ids_1.default.YOUTUBEUR_ROLE, "> pour utiliser cette commande!")];
                    }
                    annonceChannel = guild.channels.cache.get(ids_1.default.VIDEO_AND_STREAM_CHANNEL);
                    if (!annonceChannel) {
                        return [2 /*return*/];
                    }
                    content = [
                        "\uD83D\uDCFA Vid\u00E9o - ".concat(interaction.member, " a sorti une **nouvelle vid\u00E9o** sur SurvieCraft !"),
                        "\uD83D\uDD17 ".concat(lien),
                        "",
                        "\u2753 Description: ".concat(description),
                        "",
                        "<@&".concat(ids_1.default.YT_NOTIFICATIONS_ROLE, ">"),
                    ].join("\n");
                    annonceChannel.send({
                        content: content,
                        allowedMentions: {
                            roles: ["".concat(ids_1.default.YT_NOTIFICATIONS_ROLE)],
                        },
                    });
                    annonceChannel.send({
                        content: "━━━━━━━━━━━━━━━━━━━━━━━━",
                    });
                    return [2 /*return*/, interaction.reply({ content: "Votre annonce a \u00E9t\u00E9 envoy\u00E9e dans <#".concat(ids_1.default.VIDEO_AND_STREAM_CHANNEL, ">"), ephemeral: true })];
                }
                return [2 /*return*/];
            });
        });
    },
};
