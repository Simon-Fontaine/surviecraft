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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
/**
 * Handle pagination between embeds
 */
var Pagination = /** @class */ (function () {
    function Pagination(config) {
        var _a, _b, _c, _d;
        // Check if no config is sent
        if (!config)
            throw new Error("Aucune configuration n'a \u00E9t\u00E9 envoy\u00E9e - ".concat(config));
        // Destructure options from config
        var embeds = config.embeds, target = config.target, member = config.member, options = config.options;
        // Check a target is sent
        if (!(embeds === null || embeds === void 0 ? void 0 : embeds.length))
            throw new Error("Invalid embeds - ".concat(embeds));
        // Check a target is sent
        if (!target)
            throw new Error("Invalid target message - ".concat(target));
        // Check a member is sent
        if (!member)
            throw new Error("Invalid member - ".concat(member));
        // Set params
        this.target = target;
        this.member = member;
        this.embeds = embeds;
        this.deleteOnFinish = (_a = options === null || options === void 0 ? void 0 : options.deleteOnFinish) !== null && _a !== void 0 ? _a : false;
        this.page = 1;
        // Create buttons
        this.nextButton = Pagination.createButton(__assign({ id: "pagination-next", emoji: "▶", style: "SECONDARY" }, (_b = options === null || options === void 0 ? void 0 : options.buttons) === null || _b === void 0 ? void 0 : _b.next));
        this.stopButton = Pagination.createButton(__assign({ id: "pagination-stop", emoji: "⛔", style: "DANGER" }, (_c = options === null || options === void 0 ? void 0 : options.buttons) === null || _c === void 0 ? void 0 : _c.stop));
        this.prevButton = Pagination.createButton(__assign({ id: "pagination-prev", emoji: "◀", style: "SECONDARY" }, (_d = options === null || options === void 0 ? void 0 : options.buttons) === null || _d === void 0 ? void 0 : _d.prev));
        // Start the collector
        this.createCollector().catch(function (err) {
            var _a;
            console.error("Error in pagination class", (_a = err.message) !== null && _a !== void 0 ? _a : err);
        });
    }
    Pagination.prototype.createCollector = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page, _c, embeds, target, member, nextButton, stopButton, prevButton, collector, getEmbed, buttons, row;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.embeds, embeds = _c === void 0 ? [] : _c, target = _a.target, member = _a.member, nextButton = _a.nextButton, stopButton = _a.stopButton, prevButton = _a.prevButton;
                        collector = target.createMessageComponentCollector({
                            idle: 1000 * 60,
                            dispose: true,
                        });
                        getEmbed = function (p) {
                            // Get the embed from the array
                            var em = embeds[p - 1];
                            // Return the embed with the footer
                            return em === null || em === void 0 ? void 0 : em.setFooter({ text: "Page ".concat(p, " /").concat(embeds.length) });
                        };
                        buttons = [prevButton, stopButton, nextButton];
                        row = new discord_js_1.MessageActionRow().addComponents(buttons);
                        // Edit the message with the first embed page
                        return [4 /*yield*/, target.edit({
                                content: " ",
                                embeds: [getEmbed(1)],
                                components: [row],
                            })];
                    case 1:
                        // Edit the message with the first embed page
                        _d.sent();
                        collector.on("collect", function (interaction) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        // Handle if the user clicking is the correct user
                                        if (interaction.user.id !== member.id) {
                                            return [2 /*return*/, interaction.reply({
                                                    content: "Vous ne pouvez pas utiliser cette",
                                                    ephemeral: true,
                                                })];
                                        }
                                        _a = interaction.customId;
                                        switch (_a) {
                                            case "pagination-next": return [3 /*break*/, 1];
                                            case "pagination-prev": return [3 /*break*/, 2];
                                            case "pagination-stop": return [3 /*break*/, 3];
                                        }
                                        return [3 /*break*/, 5];
                                    case 1:
                                        page = page >= embeds.length ? 1 : page + 1;
                                        return [3 /*break*/, 5];
                                    case 2:
                                        page = page <= 1 ? embeds.length : page - 1;
                                        return [3 /*break*/, 5];
                                    case 3: return [4 /*yield*/, interaction.deferUpdate()];
                                    case 4:
                                        _b.sent();
                                        return [2 /*return*/, collector.stop()];
                                    case 5: 
                                    // Update the button interaction
                                    return [4 /*yield*/, interaction.update({
                                            embeds: [getEmbed(page)],
                                            components: [row],
                                        })];
                                    case 6:
                                        // Update the button interaction
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        collector.on("end", function () { return __awaiter(_this, void 0, void 0, function () {
                            var row_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!this.deleteOnFinish) return [3 /*break*/, 3];
                                        if (!target) return [3 /*break*/, 2];
                                        return [4 /*yield*/, target.delete()];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [3 /*break*/, 5];
                                    case 3:
                                        row_1 = new discord_js_1.MessageActionRow().addComponents(buttons.map(function (b) { return b.setStyle("SECONDARY").setDisabled(true); }));
                                        if (!target) return [3 /*break*/, 5];
                                        return [4 /*yield*/, target.edit({ components: [row_1] })];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Pagination.createButton = function (options) {
        // Check options
        if (!options)
            return;
        // Button options
        var url = options.url, id = options.id, emoji = options.emoji, style = options.style, label = options.label, disabled = options.disabled;
        // Build button
        var button = new discord_js_1.MessageButton().setStyle("PRIMARY");
        // Add options
        if (url)
            button.setURL(url);
        if (id)
            button.setCustomId(id);
        if (emoji)
            button.setEmoji(emoji);
        if (style)
            button.setStyle(style);
        if (label)
            button.setLabel(label);
        if (Object.keys(options).includes("disabled"))
            button.setDisabled(disabled);
        // Return the new button
        return button;
    };
    return Pagination;
}());
exports.default = Pagination;
