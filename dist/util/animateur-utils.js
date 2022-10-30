"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAnim = void 0;
var ids_1 = __importDefault(require("./ids"));
var isAnim = function (member) {
    return (member.roles.cache.has(ids_1.default.ANIMATEUR_ROLE) ||
        member.roles.cache.has(ids_1.default.RESP_ROLE) ||
        member.roles.cache.has(ids_1.default.ADMIN_ROLE));
};
exports.isAnim = isAnim;
