"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var tag_schema_1 = __importDefault(require("../../models/tag-schema"));
var discord_js_1 = require("discord.js");
var pagination_1 = __importDefault(require("../../util/pagination"));
exports.default = {
    category: "Utilitaire",
    description: "Répertorie toutes les tags existantes.",
    maxArgs: 0,
    slash: "both",
    testOnly: true,
    guildOnly: true,
    cooldown: "10s",
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var _payload, loading, _b, _c, user, tags, tagString, tagStrings, _loop_1, i, tagEmbeds, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _payload = {
                            content: "Chargement de tous les tags...",
                            allowedMentions: { roles: [], users: [] },
                        };
                        if (!interaction) return [3 /*break*/, 2];
                        return [4 /*yield*/, interaction.reply(__assign(__assign({}, _payload), { fetchReply: true }))];
                    case 1:
                        _b = (_d.sent());
                        return [3 /*break*/, 6];
                    case 2:
                        if (!message) return [3 /*break*/, 4];
                        return [4 /*yield*/, message.channel.send(_payload)];
                    case 3:
                        _c = _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _c = null;
                        _d.label = 5;
                    case 5:
                        _b = _c;
                        _d.label = 6;
                    case 6:
                        loading = _b;
                        user = interaction ? interaction.user : message ? message.author : null;
                        _d.label = 7;
                    case 7:
                        _d.trys.push([7, 11, , 14]);
                        // Throw if something really bad went wrong
                        if (!loading)
                            throw "Aucun message ou interaction - taglist.ts";
                        if (!user)
                            throw "Aucun utilisateur - taglist.ts";
                        return [4 /*yield*/, tag_schema_1.default.find()];
                    case 8:
                        tags = (_d.sent());
                        if (!!(tags === null || tags === void 0 ? void 0 : tags.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, loading.edit({ content: "Aucun tags n'existe !" })];
                    case 9:
                        _d.sent();
                        return [2 /*return*/];
                    case 10:
                        tagString = "";
                        tagStrings = [];
                        _loop_1 = function (i) {
                            // Get id and keywords of tag
                            var _id = tags[i]._id;
                            // Get the tag index
                            var tagIndex = tags.findIndex(function (t) { return t._id === _id; }) + 1;
                            // Spacing between tags
                            tagString += tagString.length < 1 ? "" : "\n\n ";
                            // ID
                            tagString += "**".concat(tagIndex, ")** ").concat(_id.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); }));
                            // Keywords
                            // tagString += `\n\n> Keywords:\n> • \`${keywords.length ? keywords.join('\n> • `') : 'None' }\``;
                            // Check if at limit of 5 or the last tag
                            if (!((i + 1) % 10) || i + 1 === tags.length) {
                                tagStrings.push(tagString);
                                tagString = "";
                            }
                        };
                        // Loop each tag and build a string
                        for (i = 0; i < tags.length; i++) {
                            _loop_1(i);
                        }
                        tagEmbeds = tagStrings.map(function (t) {
                            return new discord_js_1.MessageEmbed({
                                title: "Tags disponibles",
                                description: t,
                                color: "BLUE",
                            });
                        });
                        // Start pagination
                        new pagination_1.default({
                            embeds: tagEmbeds,
                            target: loading,
                            member: user,
                            options: { deleteOnFinish: true },
                        });
                        return [3 /*break*/, 14];
                    case 11:
                        err_1 = _d.sent();
                        console.log("Error - taglist", err_1.message || err_1);
                        if (!loading) return [3 /*break*/, 13];
                        return [4 /*yield*/, loading.edit({
                                content: "J'ai rencontré un problème, veuillez réessayer.",
                            })];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13: return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    },
};
