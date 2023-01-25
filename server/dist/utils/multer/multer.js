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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.musicUpload = exports.genreUpload = exports.podcastUpload = exports.updateProfile = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary = require("cloudinary").v2;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config_1 = __importDefault(require("../../config"));
cloudinary.config({
    cloud_name: config_1.default.CLOUD_NAME,
    api_key: config_1.default.CLOUD_API_KEY,
    api_secret: config_1.default.CLOUD_API_SECRET,
});
const updateprofile = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "UPDATESTORAGE",
            resource_type: "auto",
        };
    }),
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "ADMIINMUSIC",
            resource_type: "auto",
        };
    }),
});
const musicstorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            resource_type: "auto",
            folder: "PREMUIUMAPPMUSIC",
        };
    }),
});
const genrestorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "GENREIMAGE",
            resource_type: "auto",
        };
    }),
});
const podcaststorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary,
    params: () => __awaiter(void 0, void 0, void 0, function* () {
        return {
            resource_type: "auto",
            folder: "SMOOVEPODCAST",
        };
    }),
});
exports.updateProfile = (0, multer_1.default)({ storage: updateprofile });
exports.podcastUpload = (0, multer_1.default)({ storage: podcaststorage });
exports.genreUpload = (0, multer_1.default)({ storage: genrestorage });
exports.musicUpload = (0, multer_1.default)({ storage: musicstorage });
exports.upload = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=multer.js.map