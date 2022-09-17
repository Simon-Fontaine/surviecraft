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
    client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
        function deleteMessage() {
            message.delete();
            message.channel.send("".concat(message.author, " veuillez ne pas faire de publicit\u00E9 !"));
            var embed = new discord_js_1.MessageEmbed()
                .setTitle("Possible Publicité")
                .setDescription("**Message**\n\"".concat(message.content, "\""))
                .setFields([
                {
                    name: "Channel De la Publicité",
                    value: "".concat(message.channel),
                    inline: true,
                },
                {
                    name: "Auteur De la Publicité",
                    value: message.author.toString(),
                    inline: true,
                },
            ]);
            logChannel.send({
                embeds: [embed],
            });
        }
        var guild, logChannel, links, forbiddenLinks, _i, links_1, link, code, isGuildInvite, vanity, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!message.guild)
                        return [2 /*return*/];
                    if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.user.bot)
                        return [2 /*return*/];
                    if (message.channel.id === ids_1.default.COMMAND_CHANNEL)
                        return [2 /*return*/];
                    if ((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has("ADMINISTRATOR"))
                        return [2 /*return*/];
                    guild = client.guilds.cache.get(ids_1.default.GUILD);
                    logChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(ids_1.default.MOD_LOGS_CHANNEL);
                    links = ["discord.gg/", "discord.com/invite/"];
                    forbiddenLinks = ["discord.io/", "youtube.com/"];
                    forbiddenLinks.forEach(function (link) {
                        if (message.content.includes(link))
                            return deleteMessage();
                    });
                    _i = 0, links_1 = links;
                    _c.label = 1;
                case 1:
                    if (!(_i < links_1.length)) return [3 /*break*/, 6];
                    link = links_1[_i];
                    if (!message.content.includes(link))
                        return [2 /*return*/];
                    code = message.content.split(link)[1].split(" ")[0];
                    isGuildInvite = message.guild.invites.cache.has(code);
                    if (!!isGuildInvite) return [3 /*break*/, 5];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, message.guild.fetchVanityData()];
                case 3:
                    vanity = _c.sent();
                    if (code !== (vanity === null || vanity === void 0 ? void 0 : vanity.code))
                        return [2 /*return*/, deleteMessage()];
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _c.sent();
                    deleteMessage();
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    }); });
});
exports.config = {
    dbName: "ANTI_ADVERTISING",
    displayName: "Anti Advertising",
};
