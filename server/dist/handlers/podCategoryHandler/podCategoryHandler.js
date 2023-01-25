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
exports.deleteCategory = exports.editCategory = exports.getCategoryById = exports.getAllCategories = exports.addCategory = void 0;
const podcategoryModel_1 = require("../../model/podcategoryModel");
const uuid_1 = require("uuid");
const podcastModel_1 = require("../../model/podcastModel");
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const check = yield podcategoryModel_1.PodcategoryInstance.findOne({ where: { name } });
        if (!check) {
            const categories = new podcategoryModel_1.PodcategoryInstance({
                id: (0, uuid_1.v4)(),
                name: req.body.name,
                categoryImage: req.file.path,
            });
            const saved = yield categories.save();
            if (saved) {
                return res.status(200).json({
                    message: "Podcast Category created succesfully",
                    saved,
                });
            }
            else {
                return res.status(400).json({
                    message: "Failed, Error saving Podcast category",
                });
            }
        }
        else {
            return res.status(400).json({
                message: "Category already exist"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            er: "Internal server error",
            route: "/api/category/addCategory",
        });
    }
});
exports.addCategory = addCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategory = yield podcategoryModel_1.PodcategoryInstance.findAll({});
        if (allCategory) {
            res.status(200).json({
                message: "All podcast categories gotten successfully.",
                allCategory,
            });
        }
        else {
            res.status(400).json({
                message: "Failed to retrive podcast categories. "
            });
        }
    }
    catch (error) {
        res.status(500).json({
            er: "Internal server error",
            route: "/api/category/categories",
        });
    }
    ;
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield podcastModel_1.PodcastInstance.findByPk(id, {
            include: [{
                    model: podcastModel_1.PodcastInstance,
                    as: "podcast",
                    attributes: [
                        "id",
                        "imageUrl",
                        "episodeUrl",
                        "title",
                        "name",
                        "category",
                        "song_duration",
                    ],
                },
            ],
        });
        return res.status(200).json({
            category,
        });
    }
    catch (error) {
        res.status(500).json({
            er: "Internal server error",
            route: "/api/category/category",
        });
    }
});
exports.getCategoryById = getCategoryById;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const id = req.params.id;
        const updatedPodcast = (yield podcategoryModel_1.PodcategoryInstance.update({
            name,
            categoryImage: req.file ? req.file.path : undefined,
        }, { where: { id: id } }));
        if (updatedPodcast) {
            const Category = yield podcategoryModel_1.PodcategoryInstance.findByPk(id);
            return res.status(200).json({
                message: "Podcast category edited successfully",
                Category
            });
        }
        else {
            return res.status(400).json({
                message: "failed to save edit",
            });
        }
    }
    catch (error) {
        error;
    }
});
exports.editCategory = editCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const categoryDelete = yield podcategoryModel_1.PodcategoryInstance.destroy({
            where: { id }
        });
        if (categoryDelete) {
            return res.status(200).json({
                message: "category deleted succesfully",
                categoryDelete,
            });
        }
    }
    catch (error) {
        error;
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=podCategoryHandler.js.map