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
exports.GetArtist = exports.GetAllArtist = exports.CreateArtist = void 0;
const uuid_1 = require("uuid");
// import { UserAttributes } from "../../interface";
const model_1 = require("../../model");
/* ==========================   CREATE ARTIST  =============================. */
const CreateArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, instagramUrl, twitterUrl } = req.body;
        // const id = req.user.id;
        let uuidartist = (0, uuid_1.v4)();
        //   FIND ID EXIST
        // const authorizer = await UserInstance.findOne({
        //   where: { id: id },
        // }) as unknown as UserAttributes
        //   CHECK IF THE ID IS FOR AN EXISTING ADMIN
        // if (authorizer.role === "admin") {
        let artist = yield model_1.ArtistInstance.create({
            id: uuidartist,
            name,
            instagramUrl,
            twitterUrl,
            imageUrl: req.file.path,
        });
        if (artist) {
            return res.status(201).json({
                message: "Artist Created Successfully",
                artist,
            });
        }
        return res.status(400).json({
            Error: "Error Occured",
        });
        // }
        // return res.status(400).json({
        //   Error: "Unauthorised",
        // });
    }
    catch (err) {
        next(err);
    }
});
exports.CreateArtist = CreateArtist;
/* ==========================   GET ARTISTS  =============================. */
const GetAllArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let artists = yield model_1.ArtistInstance.findAll({});
        return res.status(201).json({
            artists,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.GetAllArtist = GetAllArtist;
/* ==========================   GET ARTIST  =============================. */
const GetArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        let artist = yield model_1.ArtistInstance.findByPk(id, {
            include: [
                {
                    model: model_1.MusicInstance,
                    as: "music",
                    attributes: [
                        "id",
                        "imageUrl",
                        "songUrl",
                        "title",
                        "artist",
                        "genreId",
                        "song_duration",
                    ],
                },
            ],
        });
        return res.status(201).json({
            artist,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.GetArtist = GetArtist;
//# sourceMappingURL=artistHandler.js.map