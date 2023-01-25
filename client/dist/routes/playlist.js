"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRoute = void 0;
const express_1 = require("express");
const playlistHandler_1 = require("../handlers/playlistHandler/playlistHandler");
const auth_1 = require("../middleware/auth/auth");
exports.playlistRoute = (0, express_1.Router)();
/**
 * @swagger
 * /api/playlist:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello playlist
 */
exports.playlistRoute
    .get("/getPlaylists", auth_1.auth, playlistHandler_1.getPlaylistSongs)
    .post("/addToPlaylist/:songId", auth_1.auth, playlistHandler_1.addSongToPlaylist);
//# sourceMappingURL=playlist.js.map