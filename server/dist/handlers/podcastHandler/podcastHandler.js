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
exports.deletePodcast = exports.updatePodcast = exports.getAllCategory = exports.getPodcastById = exports.getAllPodcast = exports.createPodcast = void 0;
const podcastModel_1 = require("../../model/podcastModel");
const uuid_1 = require("uuid");
//====================Create Podcast===========================
const createPodcast = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getFileData = () => __awaiter(void 0, void 0, void 0, function* () {
            const { podcastFile, imageFile } = req.files;
            const dataPath = {
                imagePath: imageFile[0].path,
                podcastName: podcastFile[0].originalname,
                podcastPath: podcastFile[0].path,
                podcastDuration: podcastFile[0].time,
            };
            return dataPath;
        });
        const { imagePath, podcastPath, podcastName } = yield getFileData();
        const { category, song_duration, name } = req.body;
        const id = (0, uuid_1.v4)();
        const podcast = (yield podcastModel_1.PodcastInstance.create({
            id: id,
            imageUrl: imagePath,
            episodeUrl: podcastPath,
            title: podcastName,
            name,
            category,
            song_duration,
        }));
        res.status(201).json({
            message: "Podcast created successfully",
            podcast,
            code: 201,
        });
    }
    catch (error) {
        next({ code: 400, message: "unable to create please try Again" });
    }
});
exports.createPodcast = createPodcast;
//========================== Get all Podcast================
const getAllPodcast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const podcasts = yield podcastModel_1.PodcastInstance.findAll({});
        if (podcasts) {
            res.status(200).json({
                message: "All podcast gotten successfully",
                podcasts,
            });
        }
        else {
            res.status(400).json({
                message: "No Podcast found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            route: "/api/podcast/podcasts",
        });
    }
});
exports.getAllPodcast = getAllPodcast;
//====================Get By ID==========================
const getPodcastById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const podcast = yield podcastModel_1.PodcastInstance.findByPk(id);
        return res.status(200).json({
            podcast,
        });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            route: "/api/podcast/podcast",
        });
    }
});
exports.getPodcastById = getPodcastById;
//==================================Get Categories ===========================
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const Podcast = yield podcastModel_1.PodcastInstance.findAll({
            where: { category: category },
        });
        return res.status(200).json({
            categories: Podcast,
        });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            route: "/api/podcast/podcast",
        });
    }
});
exports.getAllCategory = getAllCategory;
//========================Update Podcast========================
const updatePodcast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, name, category, song_duration } = req.body;
        const getFileData = () => __awaiter(void 0, void 0, void 0, function* () {
            const { podcastFile, imageFile } = req.files;
            const dataPath = {
                imagePath: imageFile[0].path,
                podcastName: podcastFile[0].originalname,
                podcastPath: podcastFile[0].path,
                podcastDuration: podcastFile[0].time,
            };
            return dataPath;
        });
        const { imagePath, podcastPath, podcastName } = yield getFileData();
        // const podcast = await PodcastInstance.findOne({
        //   where:{id:id}
        // }) as unknown as podcastAttributes;
        // if(!podcast){
        //   return res.status(400).json({
        //     Error: "You are not authorised to update this Podcast"
        //   })
        // }
        const updatedPodcast = (yield podcastModel_1.PodcastInstance.update({
            imageUrl: imagePath,
            episodeUrl: podcastPath,
            title: title,
            name: name || podcastName,
            category,
            song_duration,
        }, { where: { id: id } }));
        if (updatedPodcast) {
            const Podcast = yield podcastModel_1.PodcastInstance.findByPk(id);
            return res.status(200).json({
                message: "You have successfully updated the Podcast.",
                Podcast,
            });
        }
        else {
            return res.status(200).json({
                message: "Error occurred",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            route: "/api/podcast/podcasts",
        });
    }
});
exports.updatePodcast = updatePodcast;
//=====================  Delete Podcast =============================
const deletePodcast = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const podcastid = req.params.id;
        console.log(req.params.podcastid);
        // check if podcast exist
        // const Podcast = (await PodcastInstance.find({
        //   where: { id: podcastid},
        // })) as unknown as podcastAttributes;
        //
        const deletePodcast = yield podcastModel_1.PodcastInstance.destroy({
            where: { id: podcastid },
        });
        if (!deletePodcast)
            throw { code: 400, message: "Id not found" };
        return res.status(200).json({
            message: "You have successfully deleted a podcast",
            deletePodcast,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePodcast = deletePodcast;
//# sourceMappingURL=podcastHandler.js.map