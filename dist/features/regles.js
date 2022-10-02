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
var regles_schema_1 = __importDefault(require("../models/regles-schema"));
var ids_1 = __importDefault(require("../util/ids"));
exports.default = (function (client, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var guild, channel, discordEmoji, results, rows, embed, embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8, message, message;
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
                channel = guild.channels.cache.get(ids_1.default.RULES_AND_INFO_CHANNEL);
                if (!channel) {
                    return [2 /*return*/];
                }
                discordEmoji = guild.emojis.cache.find(function (emoji) { return emoji.name === "discord"; });
                if (!discordEmoji) {
                    throw new Error("Could not find the Discord emoji.");
                }
                return [4 /*yield*/, regles_schema_1.default.findById(guild.id)];
            case 1:
                results = _a.sent();
                rows = [];
                embed = new discord_js_1.MessageEmbed()
                    .setTitle("Bienvenue sur le serveur SurvieCraft - SURVIE Minecraft !")
                    .setColor("#ffea00")
                    .setDescription([
                    "Vous reconnaissez avoir pris connaissance, accepté et vous vous engagez à respecter :",
                    "",
                    "\uD83D\uDD38 le <#".concat(ids_1.default.RULES_AND_INFO_CHANNEL, "> \u00AB SurvieCraft - SURVIE Minecraft \u00BB,"),
                    "",
                    "🔸 les [Conditions Générales d'Utilisations](https://discord.com/terms) (CGU) du fournisseur du serveur Discord Inc.",
                    "",
                    "Vous êtes suffisamment avisés pour savoir si vos actes sont corrects ou non. Si une règle ne figure pas dans le règlement, cela ne vous autorise pas à l'enfreindre ou en abuser.",
                    "",
                    "Nous nous réservons le droit de retirer l'accès au serveur aux utilisateurs qui portent préjudice à ce dernier ou à sa communauté.",
                ].join("\n"));
                embed1 = new discord_js_1.MessageEmbed()
                    .setTitle("1 – VOTRE COMPTE EST SOUS VOTRE RESPONSABILITÉ")
                    .setColor("#ffea00")
                    .setDescription([
                    "Votre compte Discord est personnel. Vous serez tenu pour responsable de toute infraction au règlement commise via votre compte Discord.",
                ].join("\n"));
                embed2 = new discord_js_1.MessageEmbed()
                    .setTitle("2 – PSEUDONYME & AVATAR")
                    .setColor("#ffea00")
                    .setDescription([
                    "Le pseudonyme que vous utilisez sur le serveur doit être correct et ne pas contenir de propos offensants, irrespectueux, pornographiques, racistes, politiques, discriminatoires, illégaux ou choquants. Il en va de même pour vos avatars et phrases personnalisées.",
                ].join("\n"));
                embed3 = new discord_js_1.MessageEmbed()
                    .setTitle("3 – COMPORTEMENT")
                    .setColor("#ffea00")
                    .setDescription([
                    "Les propos irrespectueux, insultants, discriminatoires, offensants, à teneur pornographique, raciste ou politique ainsi que le harcèlement, les menaces, l'agressivité, le manque de respect, les attaques personnelles ou tout autre comportement visant à nuire à un membre entraînera une perte d'accès au serveur. Dans certaines situations extrêmes ou problématiques, les utilisateurs peuvent recevoir des sanctions temporaires ou permanentes sans avertissement préalable.",
                ].join("\n"));
                embed4 = new discord_js_1.MessageEmbed()
                    .setTitle("4 – UTILISATION DES CANAUX")
                    .setColor("#ffea00")
                    .setDescription([
                    "Les principaux canaux disposent d'informations complémentaires dans la section \"Description\". Veuillez en prendre connaissance afin d'utiliser les salons appropriés.",
                    "",
                    "Dans les canaux vocaux, le spam auditif, le changement répétitif de canal, les soundboards et modifications de voix sont interdits.",
                ].join("\n"));
                embed5 = new discord_js_1.MessageEmbed()
                    .setTitle("5 – NSFW")
                    .setColor("#ffea00")
                    .setDescription(["Les contenus pornographiques / NSFW (Not Safe for Work) sont interdits sur l'ensemble du serveur."].join("\n"));
                embed6 = new discord_js_1.MessageEmbed()
                    .setTitle("6 – PUBLICITÉ")
                    .setColor("#ffea00")
                    .setDescription([
                    "La publicit\u00E9 et les liens externes Discord sont interdits, sauf autorisation explicite d'un <@&".concat(ids_1.default.DEV_ROLE, ">, <@&").concat(ids_1.default.RESP_ROLE, "> ou <@&").concat(ids_1.default.ADMIN_ROLE, ">. Les contenus personnels sont autoris\u00E9s dans le salon <#").concat(ids_1.default.IMAGE_ET_VIDEO_CHANNEL, ">."),
                    "",
                    "Les invitations Discord et les liens malveillants sont automatiquement supprim\u00E9s par le bot, certaines images peuvent ne pas \u00EAtre publi\u00E9es automatiquement (en raison de la protection par d\u00E9faut du serveur). Pour toutes les demandes de publicit\u00E9 ou partenariat veuillez cr\u00E9er un ticket dans <#".concat(ids_1.default.TICKET_CHANNEL, ">."),
                ].join("\n"));
                embed7 = new discord_js_1.MessageEmbed()
                    .setTitle("7 – POLITIQUE DE MODÉRATION")
                    .setColor("#ffea00")
                    .setDescription([
                    "L'\u00E9quipe de <@&".concat(ids_1.default.MODERATION_ROLE, "> donnera des avertissements \u00E0 tous les membres qui ne respectent pas les r\u00E8gles. Selon la gravit\u00E9 de l'infraction, les <@&").concat(ids_1.default.GUIDE_ROLE, "> et <@&").concat(ids_1.default.MODO_ROLE, "> se r\u00E9servent le droit de sanctionner votre compte sans pr\u00E9avis."),
                ].join("\n"));
                embed8 = new discord_js_1.MessageEmbed()
                    .setColor("#ffea00")
                    .setDescription([
                    "Ces règles seront appliquées à l'ensemble du serveur. Cela inclut, sans s'y limiter : les messages, threads, profils, avatars, pseudonymes, statuts et pièces jointes. L'interprétation et l'application correcte de ces règles dépendront de l'équipe de modération.",
                    "",
                    "Les sanctions prises sur le serveur Discord peuvent être transférées sur d'autres plateformes et communautés SurvieCraft. De la même manière, les sanctions reçues sur les pages de réseaux sociaux et sur d'autres communautés SurvieCraft peuvent être appliquées sur le serveur Discord.",
                    "",
                    "Le règlement est considéré comme lu et approuvé à partir du moment où un membre a rejoint le serveur Discord.",
                    "",
                    "Le présent règlement est susceptible d'être modifié ultérieurement.",
                ].join("\n"));
                rows.push(new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton().setLabel("Règlement En Ligne").setURL("https://surviecraft.fr/regles-ig").setStyle("LINK"), new discord_js_1.MessageButton()
                    .setLabel("Conditions Générales d'Utilisation de Discord")
                    .setURL("https://discord.com/terms")
                    .setStyle("LINK")));
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
                        embeds: [embed, embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8],
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
                        embeds: [embed, embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8],
                        components: rows,
                    })];
            case 4:
                message = _a.sent();
                return [4 /*yield*/, regles_schema_1.default.findOneAndUpdate({
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
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.config = {
    dbName: "REGLES",
    displayName: "Regles",
};
