"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var ids_1 = __importDefault(require("../../util/ids"));
var getRule = function (ruleNumber) {
    var rule = "";
    switch (ruleNumber) {
        case 1:
            rule = [
                "1) Votre compte Discord est personnel. Vous serez tenu pour responsable de toute infraction au règlement commise via votre compte Discord.",
            ].join("\n");
            break;
        case 2:
            rule = [
                "2) Le pseudonyme que vous utilisez sur le serveur doit être correct et ne pas contenir de propos offensants, irrespectueux, pornographiques, racistes, politiques, discriminatoires, illégaux ou choquants. Il en va de même pour vos avatars et phrases personnalisées.",
            ].join("\n");
            break;
        case 3:
            rule = [
                "3) Les propos irrespectueux, insultants, discriminatoires, offensants, à teneur pornographique, raciste ou politique ainsi que le harcèlement, les menaces, l'agressivité, le manque de respect, les attaques personnelles ou tout autre comportement visant à nuire à un membre entraînera une perte d'accès au serveur. Dans certaines situations extrêmes ou problématiques, les utilisateurs peuvent recevoir des sanctions temporaires ou permanentes sans avertissement préalable.",
            ].join("\n");
            break;
        case 4:
            rule = [
                "4) Les principaux canaux disposent d'informations complémentaires dans la section \"Description\". Veuillez en prendre connaissance afin d'utiliser les salons appropriés.",
                "",
                "Dans les canaux vocaux, le spam auditif, le changement répétitif de canal, les soundboards et modifications de voix sont interdits.",
            ].join("\n");
            break;
        case 5:
            rule = ["5) Les contenus pornographiques / NSFW (Not Safe for Work) sont interdits sur l'ensemble du serveur."].join("\n");
            break;
        case 6:
            rule = [
                "6) La publicit\u00E9 et les liens externes Discord sont interdits, sauf autorisation explicite d'un <@&".concat(ids_1.default.DEV_ROLE, ">, <@&").concat(ids_1.default.RESP_ROLE, "> ou <@&").concat(ids_1.default.ADMIN_ROLE, ">. Les contenus personnels sont autoris\u00E9s dans le salon <#").concat(ids_1.default.IMAGE_ET_VIDEO_CHANNEL, ">."),
                "",
                "Les invitations Discord et les liens malveillants sont automatiquement supprim\u00E9s par le bot, certaines images peuvent ne pas \u00EAtre publi\u00E9es automatiquement (en raison de la protection par d\u00E9faut du serveur). Pour toutes les demandes de publicit\u00E9 ou partenariat veuillez cr\u00E9er un ticket dans <#".concat(ids_1.default.TICKET_CHANNEL, ">."),
            ].join("\n");
            break;
        case 7:
            rule = [
                "7) L'\u00E9quipe de <@&".concat(ids_1.default.MODERATION_ROLE, "> donnera des avertissements \u00E0 tous les membres qui ne respectent pas les r\u00E8gles. Selon la gravit\u00E9 de l'infraction, les <@&").concat(ids_1.default.GUIDE_ROLE, "> et <@&").concat(ids_1.default.MODO_ROLE, "> se r\u00E9servent le droit de sanctionner votre compte sans pr\u00E9avis."),
            ].join("\n");
            break;
    }
    return rule;
};
exports.default = {
    category: "Utilitaire",
    description: "Affiche une règle.",
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<numéro-règle>",
    expectedArgsTypes: ["NUMBER"],
    slash: "both",
    testOnly: true,
    guildOnly: true,
    callback: function (_a) {
        var args = _a.args;
        var rule = getRule(parseInt(args[0]));
        if (!rule) {
            return "Le numéro de la règle doit être compris entre 1 et 7.";
        }
        return new discord_js_1.MessageEmbed().setDescription("R\u00E8gle ".concat(rule));
    },
};
