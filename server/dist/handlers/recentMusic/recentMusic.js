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
exports.DisplayPlayedMusic = exports.CreatePlayedMusic = void 0;
const uuid_1 = require("uuid");
// import { musicAttributes } from "../../interface/musicAttributes";
// import { RecentMusicAttributes } from "../../interface/RecentMusicAttribute";
// import { musicAttributes, RecentMusicAttributes } from "../../interface";
const model_1 = require("../../model");
const musicModel_1 = require("../../model/musicModel");
/* ==========================   CREATE PLAYED MUSIC  =============================. */
const CreatePlayedMusic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songId = req.params.id;
        const userId = req.user.id;
        const recentlyPlayed = yield model_1.PlayedMusicInstance.findOne({ where: { songId, userId } });
        if (recentlyPlayed) {
            recentlyPlayed.updatedAt = new Date();
            const result = yield recentlyPlayed.save();
            return res.status(200).json({
                message: "Music added succesfully",
                recentlyPlayed: result
            });
        }
        const newlyPlayed = yield model_1.PlayedMusicInstance.create({
            id: (0, uuid_1.v4)(),
            songId,
            userId,
        });
        return res.status(201).json({
            message: "Music added to recently played music",
            recentlyPlayed: newlyPlayed
        });
    }
    catch (err) {
        next(err);
    }
});
exports.CreatePlayedMusic = CreatePlayedMusic;
/* ==========================   DISPLAY PLAYED MUSIC  =============================. */
const DisplayPlayedMusic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recentlyPlayedSongs = yield model_1.PlayedMusicInstance.findAll({ where: { userId: req.user.id },
            order: [['updatedAt', 'DESC']],
            limit: 6,
            include: musicModel_1.MusicInstance
        });
        return res.status(200).json({
            recentlyPlayedSongs
        });
    }
    catch (err) {
        next(err);
    }
});
exports.DisplayPlayedMusic = DisplayPlayedMusic;
//# sourceMappingURL=recentMusic.js.map