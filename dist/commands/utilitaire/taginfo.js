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
var tag_schema_1 = __importDefault(require("../../models/tag-schema"));
var discord_js_1 = require("discord.js");
exports.default = {
    category: "Utilitaire",
    description: "Affiche des informations sur un tag spécifique.",
    minArgs: 1,
    expectedArgs: "<tag>",
    slash: "both",
    testOnly: true,
    guildOnly: true,
    cooldown: "10s",
    callback: function (_a) {
        var text = _a.text, interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var tag, keywords, embed, err_1;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, tag_schema_1.default.findById(text === null || text === void 0 ? void 0 : text.toLowerCase())];
                    case 1:
                        tag = (_e.sent());
                        // Return if none are found
                        if (!tag)
                            return [2 /*return*/, "Tag non trouvé avec cet ID"];
                        keywords = (_c = (_b = tag === null || tag === void 0 ? void 0 : tag.keywords) === null || _b === void 0 ? void 0 : _b.map(function (k) { return "> \u2022 ".concat(k); })) === null || _c === void 0 ? void 0 : _c.join("\n");
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("Tag: " + tag._id.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); }))
                            .setDescription("**Message**\n ".concat(((_d = tag === null || tag === void 0 ? void 0 : tag.message) === null || _d === void 0 ? void 0 : _d.trim()) ? tag.message : "Aucun"))
                            // .addField("Message", tag?.message?.trim() ? tag.message : "Aucun")
                            .addField("Mots clés", keywords || "Aucun")
                            .setColor("PURPLE");
                        return [2 /*return*/, {
                                embeds: [embed],
                                custom: true,
                                allowedMentions: {
                                    roles: [],
                                    users: [],
                                },
                            }];
                    case 2:
                        err_1 = _e.sent();
                        // Log the error
                        console.log("Error - taginfo", err_1.message || err_1);
                        if (!interaction) return [3 /*break*/, 4];
                        return [4 /*yield*/, interaction.reply({
                                content: "Désolé, j'ai rencontré un problème, veuillez réessayer !",
                                ephemeral: true,
                            })];
                    case 3:
                        _e.sent();
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, "Désolé, j'ai rencontré un problème, veuillez réessayer !"];
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
};
