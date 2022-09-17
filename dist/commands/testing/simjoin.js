"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "Testing",
    description: "Simule une connexion.",
    slash: "both",
    testOnly: true,
    guildOnly: true,
    permissions: ["ADMINISTRATOR"],
    callback: function (_a) {
        var member = _a.member, client = _a.client;
        client.emit("guildMemberAdd", member);
        return "Event Emit!";
    },
};
