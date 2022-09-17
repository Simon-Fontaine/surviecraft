"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: "Configuration",
    description: "Sends a message as the bot.",
    minArgs: 2,
    expectedArgs: "<channel tag> <text>",
    expectedArgsTypes: ["CHANNEL", "STRING"],
    permissions: ["ADMINISTRATOR"],
    slash: "both",
    testOnly: true,
    guildOnly: true,
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args;
        var channel;
        if (message) {
            channel = message.mentions.channels.first();
            if (!channel) {
                return "Please tag a channel to send a message in.";
            }
        }
        else {
            channel = interaction.options.getChannel("channel");
        }
        args.shift(); // Remove the channel tag
        channel.send({
            content: args.join(" "),
        });
        return "Message sent!";
    },
};
