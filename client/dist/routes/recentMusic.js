"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playedMusicRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth/auth");
const recentMusic_1 = require("../handlers/recentMusic");
exports.playedMusicRoute = express_1.default.Router();
exports.playedMusicRoute.post("/create-music/:id", auth_1.auth, recentMusic_1.CreatePlayedMusic);
exports.playedMusicRoute.get("/get-music", auth_1.auth, recentMusic_1.DisplayPlayedMusic);
//# sourceMappingURL=recentMusic.js.map