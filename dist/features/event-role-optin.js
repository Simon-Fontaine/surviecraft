"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var discord_js_1 = require("discord.js");
var ids_1 = __importDefault(require("../util/ids"));
var annoncesChannel = [ids_1.default.ANNONCE_CHANNEL];
var customId = 'toggle-course-notifications';
exports.default = (function (client) {
    client.on('messageCreate', function (message) {
        var channel = message.channel;
        if (!annoncesChannel.includes(channel.id) ||
            !message.content.includes(ids_1.default.EVENT_NOTIFICATIONS_ROLE)) {
            return;
        }
        channel.send({
            content: "Voulez-vous être averti lorsqu'il y a de nouveaux évènements ?",
            components: [
                new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setCustomId(customId)
                    .setEmoji('🔔')
                    .setLabel('Activer le rôle des notifications évènements')
                    .setStyle('SUCCESS')),
            ],
        });
    });
    client.on('interactionCreate', function (interaction) {
        if (!interaction.isButton() || interaction.customId !== customId) {
            return;
        }
        var member = interaction.member;
        if (member.roles.cache.has(ids_1.default.EVENT_NOTIFICATIONS_ROLE)) {
            member.roles.remove(ids_1.default.EVENT_NOTIFICATIONS_ROLE);
            interaction.reply({
                content: 'Vous ne recevrez plus de notifications pour les nouveux évènements.',
                ephemeral: true,
            });
            return;
        }
        member.roles.add(ids_1.default.EVENT_NOTIFICATIONS_ROLE);
        interaction.reply({
            content: 'Vous recevrez désormais des notifications pour les nouveaux évènements.',
            ephemeral: true,
        });
    });
});
exports.config = {
    dbName: 'COURSE_VIDEO_ROLE_OPTIN',
    displayName: 'Course Video Role Optin',
};
