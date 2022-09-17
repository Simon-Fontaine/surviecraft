"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "Utilitaire",
    description: "Renvoie l'invitation du serveur Discord",
    cooldown: "10s",
    slash: "both",
    testOnly: true,
    callback: function (_a) {
        var text = ["> ◽ **Invitation :**", "https://discord.com/invite/7Js6rjy", "*pour plus d'info: /info*"].join("\n");
        return text;
    },
};
