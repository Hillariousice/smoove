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
exports.googleoAuthentry = void 0;
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../../config"));
const model_1 = require("../../model");
const auth_utils_1 = require("../auth-utils");
const googleoAuthentry = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new google_auth_library_1.OAuth2Client({
        clientId: config_1.default.GOOGLE_CLIENT_ID,
        clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,
        redirectUri: config_1.default.GOOGLE_CALLBACK_URL,
    });
    app.get("/auth/google", (req, res) => {
        try {
            const redirect_uri = config_1.default.GOOGLE_CALLBACK_URL || config_1.default.GOOGLE_CALLBACK_URL;
            const authUrl = client.generateAuthUrl({
                access_type: "offline",
                scope: [
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "https://www.googleapis.com/auth/userinfo.email",
                ],
                prompt: "consent",
                redirect_uri,
            });
            res.redirect(authUrl);
        }
        catch (error) {
            res.redirect(`${config_1.default.FRONTEND_BASE_URL}/auth/social/?token=error`);
        }
    });
    app.get("/auth/google/callback", (req, res, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { code } = req.query;
            const { tokens } = yield client.getToken(code);
            client.setCredentials(tokens);
            const user = yield client.credentials;
            const { id_token } = user;
            const userDataReal = jsonwebtoken_1.default.decode(id_token);
            const { picture, email, sub, given_name, email_verified } = JSON.parse(JSON.stringify(userDataReal));
            let userExist = (yield model_1.UserInstance.findOne({
                where: {
                    email: email,
                },
            }));
            if (!userExist) {
                const salt = yield (0, auth_utils_1.GenerateSalt)();
                const Gen_password = yield (0, auth_utils_1.GeneratePassword)(given_name, salt);
                const uuiduser = (0, uuid_1.v4)();
                let createdUser = (yield model_1.UserInstance.create({
                    id: uuiduser,
                    salt,
                    email,
                    password: Gen_password,
                    profileImage: picture,
                    googleId: sub,
                    userName: given_name,
                    verified: email_verified,
                    is_premium: false,
                    isLoggedIn: true,
                    role: "user",
                }));
                const token = (yield (0, auth_utils_1.GenerateSignature)({
                    id: createdUser.id,
                    email: createdUser.email,
                    verified: createdUser.verified,
                    isLoggedIn: createdUser.isLoggedIn,
                    role: createdUser.role,
                    is_premium: createdUser.is_premium,
                }));
                // res.json(token);
                res.redirect(`${config_1.default.FRONTEND_BASE_URL}/auth/social/?token=${token}`);
            }
            else {
                //update the exp aand logedIn
                //update the logged in property
                (yield model_1.UserInstance.update({
                    isLoggedIn: true,
                    verified: true,
                }, {
                    where: {
                        googleId: sub,
                    },
                    returning: true,
                }));
                const loggedinUser = (yield model_1.UserInstance.findOne({
                    where: {
                        googleId: sub,
                    },
                }));
                const payload = {
                    id: loggedinUser.id,
                    email: loggedinUser.email,
                    verified: loggedinUser.verified,
                    isLoggedIn: loggedinUser.isLoggedIn,
                    role: loggedinUser.role,
                    is_premium: loggedinUser.is_premium,
                };
                const token = yield (0, auth_utils_1.GenerateSignature)(payload);
                return res.redirect(`${config_1.default.FRONTEND_BASE_URL}/auth/social/?token=${token}`);
            }
        }
        catch (error) {
            res.redirect(`${config_1.default.FRONTEND_BASE_URL}/auth/social/?token=error`);
        }
    }));
});
exports.googleoAuthentry = googleoAuthentry;
//# sourceMappingURL=googleAuth.js.map