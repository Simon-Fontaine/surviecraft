"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    category: "Utilitaire",
    description: "Explique comment poser correctement une question.",
    cooldown: "10s",
    slash: "both",
    testOnly: true,
    guildOnly: true,
    callback: function (_a) {
        return new discord_js_1.MessageEmbed().setDescription("Contre la croyance populaire **j'ai un problème** n'est pas une information suffisante à fournir pour recevoir de l'aide. Que s'est-il passé, comment cela s'est-il passé ? Pourquoi cela s'est-il passé ? Qu'est-ce qui est à l'origine du problème ?");
    },
};
