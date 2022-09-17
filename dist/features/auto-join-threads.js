"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = (function (client) {
    client.on("threadCreate", function (thread) {
        thread.join();
    });
});
exports.config = {
    dbName: "AUTO_JOIN_THREADS",
    displayName: "Auto Join Threads",
};
