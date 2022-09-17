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
var ids_1 = __importDefault(require("../../util/ids"));
exports.default = {
    category: "Premium",
    description: "Permet aux Nitro Booster de changer la couleur de leur rôle",
    slash: "both",
    testOnly: true,
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<hex-color>",
    callback: function (_a) {
        var args = _a.args, guild = _a.guild, member = _a.member;
        return __awaiter(void 0, void 0, void 0, function () {
            var name, color, cache, role, upRole, newRole;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!guild || !member) {
                            return [2 /*return*/];
                        }
                        if (!member.roles.cache.has(ids_1.default.BOOST_ROLE)) {
                            return [2 /*return*/, "Vous devez boost le serveur pour utiliser cette commande!"];
                        }
                        if (!args[0].match(/[0-9A-Fa-f]{6}/g)) {
                            return [2 /*return*/, {
                                    custom: true,
                                    ephemeral: true,
                                    content: "Code couleur hexad\u00E9cimal invalide ! Exemples:\n0x00ff00\n#00ff00\n00ff00\n\nTrouvez la couleur parfaite ici :\n<https://www.google.com/search?q=color+picker>",
                                }];
                        }
                        name = "CustomRole-".concat(member.id);
                        color = args[0].toUpperCase();
                        cache = guild.roles.cache;
                        role = cache.find(function (role) { return role.name === name; });
                        if (role) {
                            role.setColor(color);
                            member.roles.add(role);
                            return [2 /*return*/, "Couleur du rôle mise à jour !"];
                        }
                        upRole = cache.get(ids_1.default.UP_ROLE);
                        return [4 /*yield*/, guild.roles.create({
                                name: name,
                                color: color,
                                position: 1 + ((upRole === null || upRole === void 0 ? void 0 : upRole.rawPosition) || 0),
                            })];
                    case 1:
                        newRole = _b.sent();
                        member.roles.add(newRole);
                        return [2 /*return*/, "Couleur du rôle mise à jour !"];
                }
            });
        });
    },
};
