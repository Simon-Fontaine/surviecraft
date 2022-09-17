"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var discord_js_1 = require("discord.js");
var roles_schema_1 = __importDefault(require("../models/roles-schema"));
var ids_1 = __importDefault(require("../util/ids"));
var notificationRoles = {
    "📢": [ids_1.default.ALL_NOTIFICATIONS_ROLE, "Toutes Notifications (updates, sondages, vidéo, etc.)"],
    "💾": [ids_1.default.YT_NOTIFICATIONS_ROLE, "Notifications Nouvelles Vidéos"],
    "🎲": [ids_1.default.EVENT_NOTIFICATIONS_ROLE, "Notifications Nouveaux Évents"],
    "🌄": [ids_1.default.SURVIE_NOTIFICATIONS_ROLE, "Notifications Nouveautés Survie"],
    "⚙": [ids_1.default.CHANGELOGS_NOTIFICATIONS_ROLE, "Notifications Change Logs SurvieCraft"],
};
exports.default = (function (client, instance) { return __awaiter(void 0, void 0, void 0, function () {
    var guild, channel, results, keys, rows, options, text, _loop_1, a, message, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!instance.isDBConnected()) {
                    return [2 /*return*/];
                }
                guild = client.guilds.cache.get(ids_1.default.GUILD);
                if (!guild) {
                    return [2 /*return*/];
                }
                channel = guild.channels.cache.get(ids_1.default.ROLE_CLAIM_CHANNEL);
                if (!channel) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, roles_schema_1.default.findById(guild.id)];
            case 1:
                results = _a.sent();
                keys = Object.keys(notificationRoles);
                rows = [];
                options = [];
                text = "Quelles notifications souhaitez-vous recevoir ?\n\n*Faites dérouler le menu et cliquer sur les rôles que vous souhaiter équiper.*";
                _loop_1 = function (a) {
                    var emoji = keys[a];
                    var _b = notificationRoles[emoji], id = _b[0], desc = _b[1];
                    if (emoji.startsWith(":")) {
                        emoji = guild.emojis.cache.find(function (e) {
                            if (typeof emoji === "string") {
                                return e.name === emoji.substr(1);
                            }
                            return false;
                        });
                    }
                    options.push({
                        label: desc,
                        value: id,
                        emoji: emoji,
                    });
                };
                for (a = 0; a < keys.length; ++a) {
                    _loop_1(a);
                }
                rows.push(new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                    .setCustomId("role_select")
                    .setMinValues(0)
                    .setMaxValues(options.length)
                    .setPlaceholder("Sélectionnez Vos Rôles...")
                    .addOptions(options)));
                rows.push(new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton().setURL("https://surviecraft.fr").setLabel("Site Internet SurvieCraft").setEmoji("🛒").setStyle("LINK")));
                if (!results) return [3 /*break*/, 3];
                return [4 /*yield*/, channel.messages
                        .fetch(results.messageId, {
                        cache: true,
                        force: true,
                    })
                        .catch(function () { })];
            case 2:
                message = (_a.sent());
                if (message) {
                    message.edit({
                        content: text,
                        components: rows,
                    });
                }
                else {
                    results = null;
                }
                _a.label = 3;
            case 3:
                if (!!results) return [3 /*break*/, 6];
                return [4 /*yield*/, channel.send({
                        content: text,
                        components: rows,
                    })];
            case 4:
                message = _a.sent();
                return [4 /*yield*/, roles_schema_1.default.findOneAndUpdate({
                        _id: guild.id,
                    }, {
                        _id: guild.id,
                        messageId: message.id,
                    }, {
                        upsert: true,
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                client.on("interactionCreate", function (interaction) {
                    if (!interaction.isSelectMenu() || interaction.channelId !== ids_1.default.ROLE_CLAIM_CHANNEL) {
                        return;
                    }
                    var customId = interaction.customId, values = interaction.values, member = interaction.member;
                    if (customId === "role_select" && member instanceof discord_js_1.GuildMember) {
                        var component = interaction.component;
                        var removed = component.options.filter(function (role) { return !values.includes(role.value); });
                        for (var _i = 0, removed_1 = removed; _i < removed_1.length; _i++) {
                            var id = removed_1[_i];
                            member.roles.remove(id.value);
                        }
                        for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                            var id = values_1[_a];
                            member.roles.add(id);
                        }
                        interaction.reply({
                            ephemeral: true,
                            content: "Rôles mis à jour!",
                        });
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
exports.config = {
    dbName: "AUTO_ROLES",
    displayName: "Auto Roles",
};
