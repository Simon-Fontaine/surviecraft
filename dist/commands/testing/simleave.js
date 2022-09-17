"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "Testing",
    description: "Simule une déconnexion.",
    slash: "both",
    testOnly: true,
    guildOnly: true,
    permissions: ["ADMINISTRATOR"],
    callback: function (_a) {
        var member = _a.member, client = _a.client;
        client.emit("guildMemberRemove", member);
        return "Event Emit!";
    },
};
