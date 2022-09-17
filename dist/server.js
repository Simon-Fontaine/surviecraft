"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3000;
app.get("/", function (req, res) { return res.send("Hello World!"); });
app.listen(port, function () { return console.log("[WEB] Listening to http://217.69.8.104:".concat(port)); });
console.log("[WEB] Website Up and Runing!");
