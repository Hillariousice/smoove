"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRouter = void 0;
const express_1 = __importDefault(require("express"));
const musicHandler_1 = require("../handlers/musicHandler/musicHandler");
const admin_1 = require("../middleware/admin/admin");
// import { restrictToAdmin } from "../middleware/admin/admin";
// import { getAllMusic, premium_create } from "../handlers/musicHandler/musicHandler";
const auth_1 = require("../middleware/auth/auth");
const is_premium_1 = require("../middleware/is_premium/is_premium");
const multer_1 = require("../utils/multer/multer");
exports.musicRouter = express_1.default.Router();
/**
 * @swagger
 * /api/music:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello music
 */
exports.musicRouter.post("/create-songs", auth_1.auth, admin_1.restrictToAdmin, multer_1.upload.fields([{ name: "songFile" }, { name: "imageFile" }]), musicHandler_1.AdminMusic);
exports.musicRouter
    .get("/get_song", auth_1.auth, musicHandler_1.getAllMusic)
    .post("/create", () => { })
    .post("/prem_create", auth_1.auth, is_premium_1.is_premium, multer_1.musicUpload.fields([{ name: "song_file" }, { name: "image_file" }]), musicHandler_1.premium_create)
    .put("/update/:id", () => { })
    .delete("/delete/:id", () => { });
exports.default = exports.musicRouter;
//# sourceMappingURL=music.js.map