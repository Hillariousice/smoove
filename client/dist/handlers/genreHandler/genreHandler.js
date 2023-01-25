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
exports.deleteGenre = exports.editGenre = exports.getGenreById = exports.getAllGenresLimit = exports.getAllGenres = exports.addGenre = void 0;
//import { genreAttributes } from '../../interface/genreAttributes'
const genreModel_1 = require("../../model/genreModel");
const uuid_1 = require("uuid");
const musicModel_1 = require("../../model/musicModel");
const addGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const check = yield genreModel_1.genreInstance.findOne({ where: { name } });
        if (!check) {
            const genres = new genreModel_1.genreInstance({
                id: (0, uuid_1.v4)(),
                name: req.body.name,
                genreImage: req.file.path,
            });
            const saved = yield genres.save();
            if (saved) {
                return res.status(200).json({
                    message: "Genre created successfully",
                    saved
                });
            }
            else {
                return res.status(400).json({
                    message: "Failed, Error saving Genre"
                });
            }
        }
        else {
            return res.status(400).json({
                message: "Genre already exist"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            err: "internal server error",
            route: "/api/genre/addgenre"
        });
    }
});
exports.addGenre = addGenre;
const getAllGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGenre = yield genreModel_1.genreInstance.findAll({
            order: [["createdAt", "DESC"]]
        });
        if (allGenre) {
            res.status(200).json({
                message: "All genre gotten successfully",
                allGenre
            });
        }
        else {
            res.status(400).json({
                message: "Failed to retrieve genres"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            err: "Internal Sever Error",
            route: "/api/genre/genres"
        });
    }
});
exports.getAllGenres = getAllGenres;
const getAllGenresLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGenre = yield genreModel_1.genreInstance.findAll({
            limit: 6,
            order: [["createdAt", "DESC"]]
        });
        if (allGenre) {
            res.status(200).json({
                message: "All genre gotten successfully",
                allGenre
            });
        }
        else {
            res.status(400).json({
                message: "Failed to retrieve genres"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            err: "Internal Sever Error",
            route: "/api/genre/genres"
        });
    }
});
exports.getAllGenresLimit = getAllGenresLimit;
const getGenreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const genre = yield genreModel_1.genreInstance.findByPk(id, { include: [{
                    model: musicModel_1.MusicInstance,
                    as: "music",
                    attributes: [
                        "id",
                        "title",
                        "artistId",
                        "genreId",
                        "imageUrl",
                        "songUrl"
                    ]
                }]
        });
        return res.status(200).json({
            genre
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            err: "Internal server error",
            route: "/api/genre/genre",
            error
        });
    }
});
exports.getGenreById = getGenreById;
const editGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const id = req.params.id;
        const updatedGenre = (yield genreModel_1.genreInstance.update({
            name,
            genreImage: req.file ? req.file.path : undefined,
        }, { where: { id: id } }));
        if (updatedGenre) {
            const Genre = yield genreModel_1.genreInstance.findByPk(id);
            return res.status(200).json({
                message: "Genre edited successfully",
                Genre
            });
        }
        else {
            return res.status(400).json({
                message: "failed to save edit"
            });
        }
    }
    catch (error) {
        error;
    }
});
exports.editGenre = editGenre;
const deleteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const genreDelete = yield genreModel_1.genreInstance.destroy({ where: { id } });
        if (genreDelete) {
            return res.status(200).json({
                message: "Genre deleted successfully",
                genreDelete
            });
        }
        else {
            return res.status(400).json({
                message: "Your Genre failed to saved"
            });
        }
    }
    catch (error) {
        error;
    }
});
exports.deleteGenre = deleteGenre;
//# sourceMappingURL=genreHandler.js.map