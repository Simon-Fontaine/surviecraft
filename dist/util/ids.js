"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var ProdIDs;
(function (ProdIDs) {
    ProdIDs["SIMON"] = "517770661733859329";
    ProdIDs["GUILD"] = "400071438633271299";
    ProdIDs["MODERATION_ROLE"] = "993469578778771579";
    ProdIDs["GUIDE_ROLE"] = "405470437162745857";
    ProdIDs["MODO_ROLE"] = "405471802651836447";
    ProdIDs["SUPERMODO_ROLE"] = "853959044985389056";
    ProdIDs["DEV_ROLE"] = "853297802318315520";
    ProdIDs["RESP_ROLE"] = "405471571013140490";
    ProdIDs["ADMIN_ROLE"] = "400073335372906509";
    ProdIDs["EVERYONE_ROLE"] = "400071438633271299";
    ProdIDs["HALLOWEEN_ROLE"] = "1035546586069082153";
    ProdIDs["ANIMATEUR_ROLE"] = "738489164412223559";
    ProdIDs["STREAMER_ROLE"] = "405486383638249500";
    ProdIDs["YOUTUBEUR_ROLE"] = "647433634512633869";
    ProdIDs["BEST_VOTE_ROLE"] = "1009489457738698832";
    ProdIDs["BOOST_ROLE"] = "623153568479969304";
    ProdIDs["UP_ROLE"] = "647433634512633869";
    ProdIDs["ALL_NOTIFICATIONS_ROLE"] = "980901714829930586";
    ProdIDs["YT_NOTIFICATIONS_ROLE"] = "864563618502672384";
    ProdIDs["EVENT_NOTIFICATIONS_ROLE"] = "778710263356063775";
    ProdIDs["SURVIE_NOTIFICATIONS_ROLE"] = "759719204865048617";
    ProdIDs["CHANGELOGS_NOTIFICATIONS_ROLE"] = "991739758508249138";
    ProdIDs["ROLE_CLAIM_CHANNEL"] = "698173152500514887";
    ProdIDs["IMAGE_ET_VIDEO_CHANNEL"] = "758268723500154882";
    ProdIDs["WELCOME_CHANNEL"] = "619470726541475841";
    ProdIDs["RULES_AND_INFO_CHANNEL"] = "619483560688091138";
    ProdIDs["VIDEO_AND_STREAM_CHANNEL"] = "991739758508249138";
    ProdIDs["INVITES_CHANNEL"] = "996017235447533618";
    ProdIDs["ANNONCE_CHANNEL"] = "405394327196532736";
    ProdIDs["COMMAND_CHANNEL"] = "405487634358468638";
    ProdIDs["MEMBER_COUNT_VOICE_CHANNEL"] = "980903195549270116";
    ProdIDs["STAFF_TICKET_CHANNEL"] = "860972874192912414";
    ProdIDs["STAFF_TICKET_CATEGORY"] = "694566573024870458";
    ProdIDs["STAFF_TICKET_TRANSCRIPT"] = "981204974228881578";
    ProdIDs["TICKET_CHANNEL"] = "694576383329828935";
    ProdIDs["TICKET_CATEGORY"] = "694566573024870458";
    ProdIDs["TICKET_TRANSCRIPT"] = "760149826137489458";
    ProdIDs["SUGGESTIONS_CHANNEL"] = "819611960592302090";
    ProdIDs["SUGGESTIONS_CHAT_CHANNEL"] = "980903034739634176";
    ProdIDs["LOGS_CHANNEL"] = "742457507565535332";
    ProdIDs["MOD_LOGS_CHANNEL"] = "987688266344058940";
})(ProdIDs || (ProdIDs = {}));
var DevIDs;
(function (DevIDs) {
    DevIDs["SIMON"] = "517770661733859329";
    DevIDs["GUILD"] = "977886350248398898";
    DevIDs["MODERATION_ROLE"] = "995746590377644172";
    DevIDs["GUIDE_ROLE"] = "981101424316395560";
    DevIDs["MODO_ROLE"] = "981101393437945897";
    DevIDs["SUPERMODO_ROLE"] = "981101343819333663";
    DevIDs["DEV_ROLE"] = "992839073339289673";
    DevIDs["RESP_ROLE"] = "981142066606252052";
    DevIDs["ADMIN_ROLE"] = "977904044225990666";
    DevIDs["EVERYONE_ROLE"] = "977886350248398898";
    DevIDs["MUTED_ROLE"] = "985195041280655380";
    DevIDs["HALLOWEEN_ROLE"] = "1035547976313081876";
    DevIDs["ANIMATEUR_ROLE"] = "1036273282573414441";
    DevIDs["STREAMER_ROLE"] = "992362457584648222";
    DevIDs["YOUTUBEUR_ROLE"] = "992362526786474026";
    DevIDs["BEST_VOTE_ROLE"] = "996429052334309487";
    DevIDs["BOOST_ROLE"] = "980840835631423528";
    DevIDs["UP_ROLE"] = "980840835631423528";
    DevIDs["ALL_NOTIFICATIONS_ROLE"] = "980850663795884102";
    DevIDs["YT_NOTIFICATIONS_ROLE"] = "980850836282429481";
    DevIDs["EVENT_NOTIFICATIONS_ROLE"] = "980850771589480498";
    DevIDs["SURVIE_NOTIFICATIONS_ROLE"] = "980850622653952051";
    DevIDs["CHANGELOGS_NOTIFICATIONS_ROLE"] = "980850899289276448";
    DevIDs["ROLE_CLAIM_CHANNEL"] = "980848867610333236";
    DevIDs["IMAGE_ET_VIDEO_CHANNEL"] = "995730983347310763";
    DevIDs["WELCOME_CHANNEL"] = "977917718844014643";
    DevIDs["RULES_AND_INFO_CHANNEL"] = "995724619011080294";
    DevIDs["VIDEO_AND_STREAM_CHANNEL"] = "992363220079747145";
    DevIDs["INVITES_CHANNEL"] = "996014599109357698";
    DevIDs["ANNONCE_CHANNEL"] = "996424172890763324";
    DevIDs["COMMAND_CHANNEL"] = "977904707341275136";
    DevIDs["MEMBER_COUNT_VOICE_CHANNEL"] = "980890008204505118";
    DevIDs["STAFF_TICKET_CHANNEL"] = "981140455767040000";
    DevIDs["STAFF_TICKET_CATEGORY"] = "981140747216642048";
    DevIDs["STAFF_TICKET_TRANSCRIPT"] = "981140478709887006";
    DevIDs["TICKET_CHANNEL"] = "981101125019242526";
    DevIDs["TICKET_CATEGORY"] = "981101180199518248";
    DevIDs["TICKET_TRANSCRIPT"] = "981101143855886376";
    DevIDs["SUGGESTIONS_CHANNEL"] = "977935587757666304";
    DevIDs["SUGGESTIONS_CHAT_CHANNEL"] = "980538892031762432";
    DevIDs["LOGS_CHANNEL"] = "983838239234334730";
    DevIDs["MOD_LOGS_CHANNEL"] = "989252093644800040";
})(DevIDs || (DevIDs = {}));
exports.default = process.env.PROD === "true" ? ProdIDs : DevIDs;
