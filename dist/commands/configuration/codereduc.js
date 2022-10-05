"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var highstaff_util_1 = require("../../util/highstaff-util");
var ids_1 = __importDefault(require("../../util/ids"));
exports.default = {
  category: "Configuration",
  description: "Envoie le message des codes promos.",
  permissions: ["ADMINISTRATOR"],
  cooldown: "15s",
  slash: true,
  testOnly: true,
  guildOnly: true,
  options: [
    {
      name: "montant-reduction",
      description: "Le montant de la réduction en cours.",
      required: true,
      type: "NUMBER",
    },
    {
      name: "code-promo",
      description: "Le code de la promotion.",
      required: true,
      type: "STRING",
    },
    {
      name: "jour-mois",
      description: "Jusqu'a quand la réduction est valable.",
      required: true,
      type: "STRING",
    },
  ],
  callback: function (_a) {
    var member = _a.member,
      guild = _a.guild,
      interaction = _a.interaction;
    var MONTANT_REDUCTION = interaction.options.getNumber("montant-reduction");
    var CODE_PROMO = interaction.options.getString("code-promo");
    var JOUR_MOIS = interaction.options.getString("jour-mois");
    if (!guild || !member) {
      return;
    }
    if (!(0, highstaff_util_1.isHighStaff)(member)) {
      return interaction.reply({
        content: "Vous ne pouvez pas utiliser cette commande, vous ne faites pas partie du staff.",
        ephemeral: true,
      });
    }
    var annonceChannel = guild.channels.cache.get(ids_1.default.ANNONCE_CHANNEL);
    if (!annonceChannel) {
      return interaction.reply({
        content: "Err: Aucun channel d'annonce trouv\u00E9 !",
        ephemeral: true,
      });
    }
    var rows = [];
    rows.push(new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton().setURL("https://surviecraft.fr/").setLabel("Boutique").setEmoji("🛒").setStyle("LINK")));
    var content = [
      "\uD83D\uDCAF **Annonce PROMOTION** \uD83D\uDCAF",
      "",
      "Profitez d'une promotion de **-".concat(MONTANT_REDUCTION, "%** jusqu'au `").concat(JOUR_MOIS, "`."),
      "",
      "**CODE :** `".concat(CODE_PROMO, "`"),
      "",
      "> Bon jeu sur **S**urvie**C**raft <@&".concat(ids_1.default.ALL_NOTIFICATIONS_ROLE, "> !"),
      "",
      "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
    ].join("\n");
    annonceChannel.send({
      content: content,
      components: rows,
      allowedMentions: {
        roles: ["".concat(ids_1.default.ALL_NOTIFICATIONS_ROLE)],
      },
    });
    return interaction.reply({
      content: "Votre annonce va \u00EAtre envoy\u00E9e dans <#".concat(ids_1.default.ANNONCE_CHANNEL, ">"),
      ephemeral: true,
    });
  },
};
