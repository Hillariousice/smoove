"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistRoute = void 0;
const express_1 = __importDefault(require("express"));
const artistHandler_1 = require("../handlers/artistHandler");
const admin_1 = require("../middleware/admin/admin");
const auth_1 = require("../middleware/auth/auth");
const schema_1 = require("../utils/joi-validator/schema");
const multer_1 = require("../utils/multer/multer");
// import { auth } from "../middleware/auth/auth";
exports.artistRoute = express_1.default.Router();
exports.artistRoute.post("/create-artist", auth_1.auth, admin_1.restrictToAdmin, schema_1.createArtistJoi, multer_1.upload.single("imageUrl"), artistHandler_1.CreateArtist);
exports.artistRoute.get("/get-all-artists", artistHandler_1.GetAllArtist);
exports.artistRoute.get("/get-artist/:id", artistHandler_1.GetArtist);
//# sourceMappingURL=artist.js.map