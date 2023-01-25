"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
//:::handlers:::
const index_1 = require("./routes/index");
const errorHandler_1 = require("./handlers/errorHandler");
const db_1 = require("./config/db");
const swagger_1 = require("./utils/swagger");
const googleAuth_1 = require("./utils/google-auth/googleAuth");
const fbAuth_1 = require("./utils/fb-auth/fbAuth");
const podcast_1 = require("./routes/podcast");
// ::::initalise database:::
db_1.db.sync()
    .then(() => {
    console.log("connected to db");
})
    .catch((error) => {
    console.log(error);
});
// ::::globals::::
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// :::: end globals::::
(0, swagger_1.swaggerDocs)(app);
app.use("/api/music", index_1.musicRouter);
app.use("/api/playlist", index_1.playlistRoute);
app.use("/api/user", index_1.usersRoute);
app.use("/api/artists", index_1.artistRoute);
app.use("/api/recent", index_1.playedMusicRoute);
app.use("/api/genre", index_1.genreRouter);
app.use("/api/podcast", podcast_1.PodcastRoute);
(0, googleAuth_1.googleoAuthentry)(app);
(0, fbAuth_1.fboauthBackend)(app);
app.use(errorHandler_1.errorRouterHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=server.js.map