"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "Utilitaire",
    description: "Renvoie le wiki du serveur Minecraft",
    cooldown: "10s",
    slash: "both",
    testOnly: true,
    callback: function (_a) {
        var text = ["> ◽ **Wiki du serveur :**", "https://wiki.surviecraft.fr/ ", "*pour plus d'info: /info*"].join("\n");
        return text;
    },
};
