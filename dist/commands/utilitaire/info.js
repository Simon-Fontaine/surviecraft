"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    category: "Utilitaire",
    description: "Renvoie une liste des informations utiles",
    cooldown: "10s",
    slash: "both",
    testOnly: true,
    callback: function (_a) {
        var member = _a.member, interaction = _a.interaction, message = _a.message;
        var rows = [];
        rows.push(new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton().setURL("https://surviecraft.fr").setLabel("Boutique").setEmoji("🛒").setStyle("LINK"), new discord_js_1.MessageButton().setURL("https://surviecraft.fr/vote").setLabel("Votes").setEmoji("🗳️").setStyle("LINK"), new discord_js_1.MessageButton().setURL("https://surviecraft.fr/p/Tutoriels").setLabel("Tuto").setEmoji("📺").setStyle("LINK"), new discord_js_1.MessageButton().setURL("https://surviecraft.fr/p/regles-serveur").setLabel("Règlement").setEmoji("📜").setStyle("LINK")));
        var text = [
            "📌 Voici les différents liens que tu auras besoin sur le serveur !",
            "",
            "> ◽ **IP - 1.8/1.18.2 (version conseillée 1.18.2) :**",
            "play.surviecraft.fr",
            "> ◽ **Start-Nitro :**",
            "Avec la commande: `/boost`",
            "> ◽ **Invitation :**",
            "Avec la commande: `/invite`",
        ].join("\n");
        if (message) {
            message.reply({
                content: text,
                components: rows,
            });
            return;
        }
        else {
            interaction.reply({
                content: text,
                components: rows,
            });
            return;
        }
    },
};
