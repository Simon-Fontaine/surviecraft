"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "Utilitaire",
    description: "Renvoie le wiki du serveur Minecraft",
    cooldown: "10s",
    slash: "both",
    testOnly: true,
    callback: function (_a) {
        var text = [
            "> ◽ **Start-Nitro :**",
            "Accéder au serveur de votre choix, et cliquez sur la flèche en face du nom de serveur, et sur Nitro Server Boost. Une fenêtre apparaîtra pour afficher les avantages actuels et confirmer votre Boost pour ce serveur ! Cliquez sur “Boost de serveur”, et voilà le serveur est boosté !",
            "*pour plus d'info: /info*",
        ].join("\n");
        return text;
    },
};
