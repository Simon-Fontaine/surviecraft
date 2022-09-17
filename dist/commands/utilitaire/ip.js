"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "Utilitaire",
    description: "Renvoie l'ip du serveur Minecraft",
    cooldown: "10s",
    slash: "both",
    testOnly: true,
    callback: function (_a) {
        var text = [
            "> ◽ **IP - 1.8/1.18.2 (version conseillée 1.18.2) :**",
            "```play.surviecraft.fr```",
            "*pour plus d'info: /info*",
        ].join("\n");
        return text;
    },
};
