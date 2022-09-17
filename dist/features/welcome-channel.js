"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (((f = 1), y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)) return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var discord_js_1 = require("discord.js");
var canvas_1 = __importDefault(require("canvas"));
canvas_1.default.registerFont("./dist/fonts/OpenSans-Bold.ttf", { family: "OpenSans Bold" });
canvas_1.default.registerFont("./dist/fonts/OpenSans-Regular.ttf", { family: "OpenSans Regular" });
var ids_1 = __importDefault(require("../util/ids"));
exports.default = function (client) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      client.on("guildMemberAdd", function (member) {
        return __awaiter(void 0, void 0, void 0, function () {
          var guild, channel, canvas, ctx, background, avatar, welcomeCanvas;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                guild = member.guild;
                channel = guild.channels.cache.get(ids_1.default.WELCOME_CHANNEL);
                canvas = canvas_1.default.createCanvas(1024, 500);
                ctx = canvas.getContext("2d");
                return [4 /*yield*/, canvas_1.default.loadImage("./dist/images/surviecraft-welcome-background.png")];
              case 1:
                background = _a.sent();
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.font = '40px "OpenSans Bold"';
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
                ctx.font = '42px "OpenSans Bold"';
                ctx.fillStyle = "#000000";
                ctx.strokeStyle = "white";
                ctx.textAlign = "center";
                ctx.lineWidth = 7;
                ctx.strokeText("".concat(member.user.tag, " a rejoint le serveur"), 512, 410);
                ctx.lineWidth = 1;
                ctx.fillText("".concat(member.user.tag, " a rejoint le serveur"), 512, 410);
                ctx.font = '32px "OpenSans Regular"';
                ctx.fillStyle = "#333333";
                ctx.lineWidth = 3;
                ctx.strokeText("Tu fais partie des ".concat(member.guild.memberCount, " membres de ce serveur!"), 512, 455);
                ctx.lineWidth = 1;
                ctx.fillText("Tu fais partie des ".concat(member.guild.memberCount, " membres de ce serveur!"), 512, 455);
                ctx.beginPath();
                ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                return [4 /*yield*/, canvas_1.default.loadImage(member.user.displayAvatarURL({ format: "png", size: 1024 }))];
              case 2:
                avatar = _a.sent();
                ctx.drawImage(avatar, 393, 47, 238, 238);
                welcomeCanvas = new discord_js_1.MessageAttachment(canvas.toBuffer(), "welcome-".concat(member.id, ".png"));
                channel.send({
                  content: "\uD83D\uDC4B Hey ".concat(member, ", Bienvenue sur **").concat(member.guild.name, "**!"),
                  files: [welcomeCanvas],
                  allowedMentions: {
                    users: [member.id],
                  },
                });
                return [2 /*return*/];
            }
          });
        });
      });
      return [2 /*return*/];
    });
  });
};
exports.config = {
  displayName: "Welcome Channel",
  dbName: "WELCOME_CHANNEL",
};
