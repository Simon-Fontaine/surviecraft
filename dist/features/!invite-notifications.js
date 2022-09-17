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
var _invites_1 = __importDefault(require("../models/!invites"));
var ids_1 = __importDefault(require("../util/ids"));
var guildInvites = new Map();
exports.default = (function (client) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        client.on("inviteCreate", function (invite) { return __awaiter(void 0, void 0, void 0, function () {
            var invites, codeUses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, invite.guild.invites.fetch()];
                    case 1:
                        invites = _a.sent();
                        codeUses = new Map();
                        // @ts-ignore
                        invites.each(function (inv) { return codeUses.set(inv.code, inv.uses); });
                        guildInvites.set(invite.guild.id, codeUses);
                        return [2 /*return*/];
                }
            });
        }); });
        client.once("ready", function () {
            client.guilds.cache.forEach(function (guild) {
                guild.invites
                    .fetch()
                    .then(function (invites) {
                    console.log("INVITES CACHED");
                    var codeUses = new Map();
                    invites.each(function (inv) { return codeUses.set(inv.code, inv.uses); });
                    guildInvites.set(guild.id, codeUses);
                })
                    .catch(function (err) {
                    console.log("OnReady Error:", err);
                });
            });
        });
        client.on("guildMemberAdd", function (member) { return __awaiter(void 0, void 0, void 0, function () {
            var cachedInvites, newInvites, usedInvite_1, channelId, logChannel_1, results, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachedInvites = guildInvites.get(member.guild.id);
                        return [4 /*yield*/, member.guild.invites.fetch()];
                    case 1:
                        newInvites = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        usedInvite_1 = newInvites.find(function (inv) { return cachedInvites.get(inv.code) < inv.uses; });
                        channelId = ids_1.default.INVITES_CHANNEL;
                        logChannel_1 = member.guild.channels.cache.get(channelId);
                        return [4 /*yield*/, _invites_1.default.findById(usedInvite_1.inviter.tag)];
                    case 3:
                        results = _a.sent();
                        if (results) {
                            _invites_1.default.findOne({ _id: usedInvite_1.inviter.tag }, function (err, docs) { return __awaiter(void 0, void 0, void 0, function () {
                                var count;
                                return __generator(this, function (_a) {
                                    if (err)
                                        throw err;
                                    docs.idArray.push(member.id);
                                    docs.save();
                                    count = docs.idArray.length;
                                    logChannel_1.send("`".concat(member.user.tag, "` (").concat(new Date(member.user.createdTimestamp).toLocaleDateString(), ") \u00E0 \u00E9t\u00E9 invit\u00E9 par `").concat(usedInvite_1.inviter.tag, "` avec le code `").concat(usedInvite_1.code, "`. (").concat(count, " invitations)."));
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        if (!!results) return [3 /*break*/, 5];
                        return [4 /*yield*/, _invites_1.default.findOneAndUpdate({
                                _id: usedInvite_1.inviter.tag,
                            }, {
                                _id: usedInvite_1.inviter.tag,
                                GuildId: member.guild.id,
                                idArray: ["".concat(member.id)],
                            }, {
                                upsert: true,
                            })];
                    case 4:
                        _a.sent();
                        logChannel_1.send("`".concat(member.user.tag, "` (").concat(new Date(member.user.createdTimestamp).toLocaleDateString(), ") \u00E0 \u00E9t\u00E9 invit\u00E9 par `").concat(usedInvite_1.inviter.tag, "` avec le code `").concat(usedInvite_1.code, "`. (1 invitations)."));
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.log("OnGuildMemberAdd Error:", err_1);
                        return [3 /*break*/, 7];
                    case 7:
                        newInvites.each(function (inv) { return cachedInvites.set(inv.code, inv.uses); });
                        guildInvites.set(member.guild.id, cachedInvites);
                        return [2 /*return*/];
                }
            });
        }); });
        client.on("guildMemberRemove", function (member) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _invites_1.default.findOne({ GuildID: member.guild.id, idArray: member.id }, function (err, docs) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (err)
                            throw err;
                        if (!docs)
                            return [2 /*return*/, console.log("Le membre n'a pas été invité")];
                        docs.idArray.remove(member.id);
                        docs.save();
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
exports.config = {
    displayName: "Invite Notifications",
    dbName: "INVITE_NOTIFICATIONS",
};
