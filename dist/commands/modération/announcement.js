"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var staff_util_1 = require("../../util/staff-util");
var ids_1 = __importDefault(require("../../util/ids"));
exports.default = {
    category: "Modération",
    description: "Envoie un messsage d'annonce dans le channel d'annonce du serveur Discord.",
    cooldown: "15m",
    slash: true,
    testOnly: true,
    guildOnly: true,
    options: [
        {
            name: "montant-minute",
            description: "Le nombre de minutes avant l'event.",
            required: true,
            type: "NUMBER",
        },
    ],
    callback: function (_a) {
        var member = _a.member, client = _a.client, interaction = _a.interaction;
        if (!(0, staff_util_1.isStaff)(member)) {
            return "Vous ne pouvez pas utiliser cette commande, vous ne faites pas partie du staff.";
        }
        var guild = client.guilds.cache.get(ids_1.default.GUILD);
        if (!guild) {
            return;
        }
        var channel = guild.channels.cache.get(ids_1.default.ANNONCE_CHANNEL);
        if (!channel) {
            return;
        }
        var surviecraftEmoji = guild.emojis.cache.find(function (emoji) { return emoji.name === "SC"; });
        var MONTANT_MINUTES = interaction.options.getNumber("montant-minute");
        var content = [
            "Bonjour cher joueurs,",
            "",
            "Nous vous informons que l'event propos\u00E9 par le Staff commencera dans **".concat(MONTANT_MINUTES, " minute").concat(MONTANT_MINUTES > 1 ? "s" : "", "** \u231B"),
            "",
            "> Connectez vous sur `play.surviecraft.fr` et rendez-vous au `/warp event`",
            "",
            "*pour plus d'informations, lisez les <#".concat(ids_1.default.ANNONCE_CHANNEL, "> et les messages en jeu* \uD83D\uDD0D"),
            "",
            "Bonne participation, nous esperons vous voir nombreux,",
            "L'\u00E9quipe de mod\u00E9ration **S**urvie**C**raft ".concat(surviecraftEmoji),
            "",
            "||<@&".concat(ids_1.default.EVENT_NOTIFICATIONS_ROLE, ">||"),
            "",
            "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
        ].join("\n");
        channel.send({
            content: content,
            allowedMentions: {
                roles: ["".concat(ids_1.default.EVENT_NOTIFICATIONS_ROLE)],
            },
        });
        return interaction.reply({ content: "Votre annonce a \u00E9t\u00E9 envoy\u00E9e dans <#".concat(ids_1.default.ANNONCE_CHANNEL, ">"), ephemeral: true });
    },
};
