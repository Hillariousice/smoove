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
exports.createArtistJoi = exports.changePasswordJoi = exports.sendemailTokenJoi = exports.createUserJoi = exports.RegisterUserJoi = exports.loginUserJoi = exports.updateUserJoi = exports.option = void 0;
const joi_1 = __importDefault(require("joi"));
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
const updateUserJoi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateSchema = joi_1.default.object().keys({
        firstName: joi_1.default.string(),
        profileImage: joi_1.default.any(),
        lastName: joi_1.default.string(),
        address: joi_1.default.string(),
        country: joi_1.default.string(),
        password: joi_1.default.string(),
        currency: joi_1.default.string(),
    });
    const check = updateSchema.validate(req.body, exports.option);
    if (check.error) {
        return res.status(400).json({ code: 400, error: check.error.message });
    }
    else {
        next();
    }
});
exports.updateUserJoi = updateUserJoi;
const loginUserJoi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginSchema = joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().min(4),
    });
    const check = loginSchema.validate(req.body, exports.option);
    if (check.error) {
        return res.status(400).json({ code: 400, error: check.error.message });
    }
    else {
        next();
    }
});
exports.loginUserJoi = loginUserJoi;
const RegisterUserJoi = (req, res, next) => {
    const registerSchema = joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        userName: joi_1.default.string().min(5).required(),
        gender: joi_1.default.string().required(),
        date_birth: joi_1.default.string().required(),
        password: joi_1.default
            .string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .required(),
        // confirm_password: joi.any().equal(joi.ref('password')).required()
        // .label('confirm password').messages({'any.only': '{{#label}} does not match'})
    });
    const check = registerSchema.validate(req.body, exports.option);
    if (check.error) {
        return res.status(400).json({ code: 400, error: check.error.message });
    }
    else {
        next();
    }
};
exports.RegisterUserJoi = RegisterUserJoi;
const createUserJoi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let schema = joi_1.default.object({
        username: joi_1.default.string().required().min(4),
        password: joi_1.default.string().min(4).required(),
    });
    const check = schema.validate(req.body, exports.option);
    if (check.error) {
        return res.status(400).json({ code: 400, error: check.error.message });
    }
    else {
        next();
    }
});
exports.createUserJoi = createUserJoi;
const sendemailTokenJoi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let schema = joi_1.default.object({
        email: joi_1.default.string().email().required().min(8),
    });
    const check = schema.validate(req.body, exports.option);
    if (check.error) {
        return res.status(400).json({ code: 400, error: check.error.message });
    }
    else {
        next();
    }
});
exports.sendemailTokenJoi = sendemailTokenJoi;
const changePasswordJoi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let schema = joi_1.default.object({
        password: joi_1.default.string().min(4),
        token: joi_1.default.string().required().min(3),
    });
    const check = schema.validate(req.body, exports.option);
    if (check.error) {
        return res.status(400).json({ code: 400, error: check.error.message });
    }
    else {
        next();
    }
});
exports.changePasswordJoi = changePasswordJoi;
const createArtistJoi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let schema = joi_1.default.object({
        name: joi_1.default.string(),
        imageUrl: joi_1.default.string(),
        instagramUrl: joi_1.default.string(),
        twitterUrl: joi_1.default.string(),
    });
    const check = schema.validate(req.body, exports.option);
    if (check.error) {
        return res.status(400).json({ code: 400, error: check.error.message });
    }
    else {
        next();
    }
});
exports.createArtistJoi = createArtistJoi;
//# sourceMappingURL=schema.js.map