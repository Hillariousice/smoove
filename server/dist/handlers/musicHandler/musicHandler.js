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
exports.getAllMusic = exports.premium_create = exports.AdminMusic = void 0;
const uuid_1 = require("uuid");
const model_1 = require("../../model");
const musicModel_1 = require("../../model/musicModel");
const artistModel_1 = require("../../model/artistModel");
const genreModel_1 = require("../../model/genreModel");
const AdminMusic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getFileData = () => __awaiter(void 0, void 0, void 0, function* () {
            const { songFile, imageFile } = req.files;
            const dataPath = {
                imagePath: imageFile[0].path,
                songName: songFile[0].originalname,
                songPath: songFile[0].path,
            };
            return dataPath;
        });
        const { imagePath, songPath } = yield getFileData();
        const musicId = (0, uuid_1.v4)();
        const { title, artist, genreId } = req.body;
        const user = (yield model_1.UserInstance.findOne({
            where: { email: req.user.email },
        }));
        console.log(2);
        if (!user) {
            return res.status(400).json({
                error: "You are not a registered user ",
            });
        }
        if (user.role === "admin") {
            let song_duration = req.body.song_duration;
            song_duration = song_duration || "0:00";
            console.log(req.body);
            const artistData = (yield artistModel_1.ArtistInstance.findOne({
                where: { name: artist },
            }));
            if (!artistData) {
                throw { code: 404, message: "Artist does not exist" };
            }
            const genreData = (yield genreModel_1.genreInstance.findOrCreate({
                where: { id: genreId },
            }));
            if (!genreData) {
                throw { code: 404, message: "genre does not exist" };
            }
            const music = (yield musicModel_1.MusicInstance.create({
                id: musicId,
                title,
                artistId: artistData.id,
                artist: artist,
                genreId,
                imageUrl: imagePath,
                songUrl: songPath,
                song_duration: song_duration,
            }));
            return res.status(201).json({
                message: "Music created successfully",
                music,
                code: 201,
            });
        }
        else {
            throw { code: 401, message: "You are not an admin!" };
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.AdminMusic = AdminMusic;
const premium_create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getMusicData = () => __awaiter(void 0, void 0, void 0, function* () {
            const { song_file, image_file } = req.files;
            console.log(req.files, req.body);
            const data_path = {
                image_path: image_file[0].path,
                song_name: song_file[0].originalName,
                song_path: song_file[0].path,
            };
            return data_path;
        });
        const { image_path, song_path, song_name } = yield getMusicData();
        console.log(image_path, song_path, song_name);
        const music_id = (0, uuid_1.v4)();
        const { title, artistId, genreId, song_duration, artist } = req.body;
        const createMusic = (yield musicModel_1.MusicInstance.create({
            id: music_id,
            title,
            artistId,
            genreId,
            artist,
            imageUrl: image_path,
            songUrl: song_path,
            song_duration,
        }));
        res.status(201).json({
            message: "Music created successfully",
            createMusic,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "something went wrong",
        });
    }
});
exports.premium_create = premium_create;
const getAllMusic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield musicModel_1.MusicInstance.findAll();
        res.status(200).json({
            songs,
            code: 200,
            message: "you have succesfully received all songs",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllMusic = getAllMusic;
//# sourceMappingURL=musicHandler.js.map