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
var tags_1 = require("../../features/tags");
var validActions = ["create", "delete", "keyword"];
var validEditActions = "/tagedit \"".concat(validActions
    .filter(function (tag) { return tag !== "delete"; })
    .toString()
    .replace(",", '" ou "'), "\"!");
exports.default = {
    category: "Configuration",
    description: "Crée un tag",
    permissions: ["ADMINISTRATOR"],
    minArgs: 2,
    expectedArgs: "<\"".concat(validActions.toString().replace(",", '" OR "'), "\"> <tag> <text>"),
    slash: "both",
    testOnly: true,
    guildOnly: true,
    options: [
        {
            name: "action",
            description: "Quelle action effectuer.",
            required: true,
            type: "STRING",
            choices: validActions.map(function (action) { return ({ name: action, value: action }); }),
        },
        {
            name: "tag",
            description: "Le nom du tag.",
            required: true,
            type: "STRING",
        },
        {
            name: "text",
            description: "Une réponse simple pour ce tag.",
            required: false,
            type: "STRING",
        },
    ],
    callback: function (_a) {
        var args = _a.args, interaction = _a.interaction;
        return __awaiter(void 0, void 0, void 0, function () {
            var action, response, name, text, tagNotExist, results, results, askMessage, err_1, createdResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        action = (args.shift() || "").toLowerCase();
                        response = function (msg) {
                            return ({
                                content: msg,
                                custom: true,
                                allowedMentions: {
                                    roles: [],
                                    users: [],
                                },
                            });
                        };
                        // Disabled for legacy commands
                        if (!interaction)
                            return [2 /*return*/, response("La commande à prefix est désactivée, veuillez utiliser la commande slash.")];
                        // If this is not a valid action return
                        if (!validActions.includes(action))
                            return [2 /*return*/, response("Veuillez utiliser l'un des \u00E9l\u00E9ments suivants pour une action (premier argument) \"".concat(validActions, "\""))];
                        name = args.shift().toLowerCase();
                        text = args.join(" ");
                        tagNotExist = "Ce tag n'existe pas ! Pour le cr\u00E9er, ex\u00E9cutez `/tagedit create ".concat(name, " <message>`");
                        if (!(action === "delete")) return [3 /*break*/, 3];
                        return [4 /*yield*/, tag_schema_1.default.findOne({ _id: name })];
                    case 1:
                        results = _b.sent();
                        // Handle if the tag does not exist
                        if (!results)
                            return [2 /*return*/, response(tagNotExist)];
                        // Delete the tag
                        return [4 /*yield*/, tag_schema_1.default.findOneAndDelete({ _id: name })];
                    case 2:
                        // Delete the tag
                        _b.sent();
                        (0, tags_1.removeTag)(name);
                        // Return a success message
                        return [2 /*return*/, response("Tag \"".concat(name, "\" a \u00E9t\u00E9 supprim\u00E9!"))];
                    case 3:
                        if (!(action === "keyword")) return [3 /*break*/, 5];
                        // If text is not sent then alert the user
                        if (!text)
                            return [2 /*return*/, response("Veuillez fournir un message pour le tag lorsque vous utilisez \"".concat(validEditActions, "\"!"))];
                        text = text.toLowerCase();
                        return [4 /*yield*/, tag_schema_1.default.findOneAndUpdate({ _id: name }, { $addToSet: { keywords: text } }, { new: true })];
                    case 4:
                        results = _b.sent();
                        // If successful add the tag and return response
                        if (results) {
                            (0, tags_1.addTag)(name, results.message, results.keywords);
                            return [2 /*return*/, response("Mot cl\u00E9 \"".concat(text, "\" ajout\u00E9 au tag \"").concat(name, "\""))];
                        }
                        // Return tag doesnt exist
                        return [2 /*return*/, response(tagNotExist)];
                    case 5:
                        if (!(action === "create")) return [3 /*break*/, 14];
                        askMessage = void 0;
                        if (!!text) return [3 /*break*/, 10];
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 9, , 10]);
                        return [4 /*yield*/, interaction.reply({
                                content: "Veuillez entrer le message pour ce tag : (Vous avez 45 secondes)",
                                fetchReply: true,
                            })];
                    case 7:
                        askMessage = (_b.sent());
                        return [4 /*yield*/, getTagText(interaction)];
                    case 8:
                        // Await for user message and set as text
                        text = _b.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_1 = _b.sent();
                        // Handle errors when collecting the text
                        return [2 /*return*/, response("Je n'ai pas reçu de texte valide !")];
                    case 10: return [4 /*yield*/, tag_schema_1.default.findOneAndUpdate({ _id: name }, { message: text }, { upsert: true })];
                    case 11:
                        _b.sent();
                        (0, tags_1.addTag)(name, text, []);
                        createdResponse = response("Tag \"".concat(name, "\" cr\u00E9e avec comme message \"").concat(text, "\""));
                        if (!askMessage) return [3 /*break*/, 13];
                        return [4 /*yield*/, interaction.editReply(createdResponse)];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 13: return [2 /*return*/, createdResponse];
                    case 14: return [2 /*return*/];
                }
            });
        });
    },
};
function getTagText(interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var filter, collectedMessage, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    filter = function (msg) { var _a; return msg.author.id === ((_a = interaction === null || interaction === void 0 ? void 0 : interaction.member) === null || _a === void 0 ? void 0 : _a.id); };
                    return [4 /*yield*/, ((_a = interaction === null || interaction === void 0 ? void 0 : interaction.channel) === null || _a === void 0 ? void 0 : _a.awaitMessages({
                            filter: filter,
                            max: 1,
                            time: 45 * 1000,
                            errors: ["time"],
                        }))];
                case 1:
                    collectedMessage = _b.sent();
                    text = collectedMessage === null || collectedMessage === void 0 ? void 0 : collectedMessage.first();
                    // throw when no messages are collected
                    if (!(text === null || text === void 0 ? void 0 : text.content))
                        throw "Aucun message recueilli";
                    // Return the collected message
                    return [2 /*return*/, text === null || text === void 0 ? void 0 : text.content];
            }
        });
    });
}
