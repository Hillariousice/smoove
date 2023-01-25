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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSongToPlaylist = exports.getPlaylistSongs = void 0;
const model_1 = require("../../model");
const model_2 = require("../../model");
const getPlaylistSongs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const user = (yield model_1.UserInstance.findOne({
            where: { id },
        }));
        if (user.is_premium) {
            const playlist = yield model_2.PlaylistInstance.findAll({
                order: [["createdAt", "DESC"]],
            });
            res.status(200).json({ code: 200, playlist });
        }
        else {
            throw { code: 400, message: "User is not a premium user" };
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getPlaylistSongs = getPlaylistSongs;
const addSongToPlaylist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const songId = req.params.songId;
        const user = (yield model_1.UserInstance.findOne({
            where: { id },
        }));
        const song = (yield model_1.MusicInstance.findOne({
            where: { id: songId },
        }));
        if (user.is_premium) {
            let newPlaylistSong = (yield model_2.PlaylistInstance.create({
                id: song.id,
                title: song.title,
                artist: song.artist,
                song_duration: song.song_duration,
                genreId: song.genreId,
                songUrl: song.songUrl,
                imageUrl: song.imageUrl,
            }));
            return res.status(201).json({
                message: "Song successfully added to playlist",
                newPlaylistSong,
            });
        }
        else {
            //User status isn't premium
            //User status isn't premium
            throw { code: 400, message: "User is not a premium user" };
        }
    }
    catch (err) {
        next(err);
    }
});
exports.addSongToPlaylist = addSongToPlaylist;
//# sourceMappingURL=playlistHandler.js.map