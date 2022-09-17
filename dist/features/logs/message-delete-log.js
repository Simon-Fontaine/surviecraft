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
var ids_1 = __importDefault(require("../../util/ids"));
exports.default = (function (client) {
    client.on("messageDelete", function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var guild, logChannel, logs, log, messageContent, embed;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (message.author.bot)
                        return [2 /*return*/];
                    guild = client.guilds.cache.get(ids_1.default.GUILD);
                    logChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(ids_1.default.LOGS_CHANNEL);
                    return [4 /*yield*/, message.guild.fetchAuditLogs({
                            limit: 1,
                        })];
                case 1:
                    logs = _b.sent();
                    log = logs.entries.first();
                    messageContent = message.content.slice(0, 1000) + (message.content.length > 1000 ? " ..." : "");
                    if (!messageContent) {
                        return [2 /*return*/];
                    }
                    embed = new discord_js_1.MessageEmbed()
                        .setColor("RED")
                        .setTitle("Un message a été supprimé")
                        .setTimestamp()
                        .setFooter({ text: message.guild.name })
                        .addField("Message supprimé :", messageContent);
                    if (message.attachments.size >= 1) {
                        // If the message got attachments it maps them by their url
                        embed.addField("Pi\u00E8ces jointes:", "".concat(message.attachments.map(function (a) { return "[image](".concat(a.url, ")"); }).join("\n")));
                    }
                    // @ts-ignore
                    if ((log === null || log === void 0 ? void 0 : log.action) == "MESSAGE_DELETE") {
                        // If the last entry fetched is of the type "MESSAGE_DELETE" executes code
                        embed.setDescription("> Un message de ".concat(message.member, " dans <#").concat(message.channelId, "> a \u00E9t\u00E9 supprim\u00E9 par `").concat((_a = log === null || log === void 0 ? void 0 : log.executor) === null || _a === void 0 ? void 0 : _a.tag, "`"));
                        logChannel === null || logChannel === void 0 ? void 0 : logChannel.send({ embeds: [embed] });
                    }
                    else {
                        // Else it means they deleted it themselves
                        embed.setDescription("> Un message ".concat(message.member, " dans <#").concat(message.channelId, "> a \u00E9t\u00E9 supprim\u00E9 par lui-m\u00EAme"));
                        logChannel === null || logChannel === void 0 ? void 0 : logChannel.send({ embeds: [embed] });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
exports.config = {
    dbName: "EMBED_LOG",
    displayName: "Embed Log",
};
