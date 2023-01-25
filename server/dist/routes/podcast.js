"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastRoute = void 0;
const express_1 = require("express");
const multer_1 = require("../utils/multer/multer");
const podcastHandler_1 = require("../handlers/podcastHandler");
const auth_1 = require("../middleware/auth/auth");
const is_premium_1 = require("../middleware/is_premium/is_premium");
exports.PodcastRoute = (0, express_1.Router)();
/**
 * @swagger
 * /api/podcast:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello podcast
 */
exports.PodcastRoute.post("/create", auth_1.auth, is_premium_1.is_premium, multer_1.podcastUpload.fields([
    {
        name: "podcastFile",
    },
    { name: "imageFile" },
]), podcastHandler_1.createPodcast);
exports.PodcastRoute.get("/podcasts", podcastHandler_1.getAllPodcast);
exports.PodcastRoute.get("/podcast/:id", podcastHandler_1.getPodcastById);
exports.PodcastRoute.get("/:category", podcastHandler_1.getAllCategory);
exports.PodcastRoute.patch("/update/:id", podcastHandler_1.updatePodcast);
exports.PodcastRoute.delete("/delete/:id", podcastHandler_1.deletePodcast);
//# sourceMappingURL=podcast.js.map