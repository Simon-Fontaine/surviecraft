"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var highstaff_util_1 = require("../../util/highstaff-util");
var ids_1 = __importDefault(require("../../util/ids"));
exports.default = {
    category: "Configuration",
    description: "Envoie le message des résultats des votes.",
    permissions: ["ADMINISTRATOR"],
    cooldown: "15s",
    slash: true,
    testOnly: true,
    guildOnly: true,
    options: [
        {
            name: "1er-gagnant",
            description: "Le premier des tops vote.",
            required: true,
            type: "USER",
        },
        {
            name: "2eme-gagnant",
            description: "Le deuxième des tops vote.",
            required: true,
            type: "USER",
        },
        {
            name: "3eme-gagnant",
            description: "Le troisième des tops vote.",
            required: true,
            type: "USER",
        },
        {
            name: "1er-prix",
            description: "Le montant du premier prix.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "2eme-prix",
            description: "Le montant du deuxième prix.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "3eme-prix",
            description: "Le montant du troisième prix.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "1er-nombre-votes",
            description: "Le nombre de vote du premier.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "2eme-nombre-votes",
            description: "Le nombre de vote du deuxième.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "3eme-nombre-votes",
            description: "Le nombre de vote du troisième.",
            required: true,
            type: "NUMBER",
        },
    ],
    callback: function (_a) {
        var member = _a.member, guild = _a.guild, interaction = _a.interaction, args = _a.args;
        var premierGagnant = interaction.options.getMember("1er-gagnant");
        var deuxièmeGagnant = interaction.options.getMember("2eme-gagnant");
        var troisièmeGagnant = interaction.options.getMember("3eme-gagnant");
        var premierPrix = interaction.options.getNumber("1er-prix");
        var deuxièmePrix = interaction.options.getNumber("2eme-prix");
        var troisièmePrix = interaction.options.getNumber("3eme-prix");
        var premierNombresVotes = interaction.options.getNumber("1er-nombre-votes");
        var deuxièmeNombresVotes = interaction.options.getNumber("2eme-nombre-votes");
        var troisièmeNombresVotes = interaction.options.getNumber("3eme-nombre-votes");
        if (!guild || !member) {
            return;
        }
        if (!(0, highstaff_util_1.isHighStaff)(member)) {
            return interaction.reply({
                content: "Vous ne pouvez pas utiliser cette commande, vous ne faites pas partie du staff.",
                ephemeral: true,
            });
        }
        var annonceChannel = guild.channels.cache.get(ids_1.default.ANNONCE_CHANNEL);
        if (!annonceChannel) {
            return;
        }
        var role = guild.roles.cache.find(function (role) { return role.name === "| Top Voteurs"; });
        if (!role) {
            return;
        }
        guild.roles.create({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            position: role.position,
            permissions: role.permissions,
            mentionable: role.mentionable,
        });
        role.delete("Enlèvement du rôle aux anciens top vote");
        var images = [
            "https://cdn.discordapp.com/attachments/995730983347310763/996455406811496508/celebrate1.gif",
            "https://cdn.discordapp.com/attachments/995730983347310763/996455407092518994/celebrate2.gif",
            "https://cdn.discordapp.com/attachments/995730983347310763/996455407327383605/celebrate3.gif",
            "https://cdn.discordapp.com/attachments/995730983347310763/996455407658729502/celebrate4.gif",
            "https://cdn.discordapp.com/attachments/995730983347310763/996472790884569248/congratulations.gif",
            "https://cdn.discordapp.com/attachments/995730983347310763/996472791354314883/happy-too-happy.gif",
            "https://cdn.discordapp.com/attachments/995730983347310763/996472791643730030/genial-trop-bien.gif",
            "https://cdn.discordapp.com/attachments/995730983347310763/996472791891202048/simon-cowell-two-thumbs-up.gif",
        ];
        var image = images[Math.floor(Math.random() * images.length)];
        setTimeout(function () {
            var newRole = guild.roles.cache.find(function (role) { return role.name === "| Top Voteurs"; });
            // @ts-ignore
            premierGagnant.roles.add(newRole);
            // @ts-ignore
            deuxièmeGagnant.roles.add(newRole);
            // @ts-ignore
            troisièmeGagnant.roles.add(newRole);
            var content = [
                "\uD83C\uDFC6 **Annonce ".concat(newRole, " de ce mois-ci :**"),
                "",
                "**Top** 1\uFE0F\u20E3 ".concat(premierGagnant, " avec ").concat(premierNombresVotes, " votes (").concat(premierPrix, "\u20AC boutique)"),
                "**Top** 2\uFE0F\u20E3 ".concat(deuxièmeGagnant, " avec ").concat(deuxièmeNombresVotes, " votes (").concat(deuxièmePrix, "\u20AC boutique)"),
                "**Top** 3\uFE0F\u20E3 ".concat(troisièmeGagnant, " avec ").concat(troisièmeNombresVotes, " votes (").concat(troisièmePrix, "\u20AC boutique)"),
                "",
                "> __F\u00E9licitations__ \u00E0 eux ! Les votes sont maintenant r\u00E9initialis\u00E9s.",
                "",
                "<@&".concat(ids_1.default.ALL_NOTIFICATIONS_ROLE, ">"),
            ].join("\n");
            annonceChannel.send({
                content: content,
                files: [
                    {
                        attachment: image,
                        name: "image.gif",
                    },
                ],
                allowedMentions: {
                    roles: ["".concat(ids_1.default.ALL_NOTIFICATIONS_ROLE)],
                },
            });
        }, 5000);
        setTimeout(function () {
            annonceChannel.send({
                content: "━━━━━━━━━━━━━━━━━━━━━━━━",
            });
        }, 7000);
        return interaction.reply({
            content: "Votre annonce va \u00EAtre envoy\u00E9e __**dans 5 secondes**__ dans <#".concat(ids_1.default.ANNONCE_CHANNEL, ">"),
            ephemeral: true,
        });
    },
};
