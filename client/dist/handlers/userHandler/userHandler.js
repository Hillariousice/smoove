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
exports.getUser = exports.changepassword = exports.requestPassword = exports.logout = exports.verifyUser = exports.update = exports.signin = exports.Register = void 0;
const model_1 = require("../../model");
const auth_utils_1 = require("../../utils/auth-utils");
const uuid_1 = require("uuid");
const notification_1 = require("../../utils/notification");
/* =============SIGNUP=======================. */
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, password, gender, date_birth } = req.body;
        const uuiduser = (0, uuid_1.v4)();
        const salt = yield (0, auth_utils_1.GenerateSalt)();
        const userPassword = yield (0, auth_utils_1.GeneratePassword)(password, salt);
        //check if user already exists using key value pairs in the object
        const userCheck = yield model_1.UserInstance.findOne({ where: { email: email } });
        //Create User
        if (!userCheck) {
            let newUser = (yield model_1.UserInstance.create({
                id: uuiduser,
                email,
                userName,
                gender,
                date_birth,
                password: userPassword,
                salt,
                role: "user",
                verified: false,
                is_premium: false,
                isLoggedIn: false,
            }));
            const token = yield (0, auth_utils_1.GenerateSignature)({
                id: newUser.id,
                email: newUser.email,
                verified: newUser.verified,
                role: newUser.role,
                is_premium: false,
                isLoggedIn: newUser.isLoggedIn,
            });
            const temp = (0, notification_1.welcomeEmail)(userName, token);
            yield (0, notification_1.sendEmail)(email, "Signup Success", temp);
            return res.status(201).json({
                message: "User created successfully, check your email to activate you account",
                token,
            });
        }
        else {
            //User already exists
            throw { code: 400, message: "User already exists" };
        }
    }
    catch (err) {
        next(err);
    }
});
exports.Register = Register;
/* =============LOGIN=======================. */
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const User = (yield model_1.UserInstance.findOne({
            where: { email: email },
        }));
        if (!User) {
            throw { code: 400, message: "Invalide Email or Password" };
        }
        else {
            if (!User.verified)
                throw { code: 400, message: "Account Not Activated" };
            //validate password
            const validPassword = yield (0, auth_utils_1.validatePassword)(password, User.password, User.salt);
            if (!validPassword)
                throw { code: 400, message: "Invalide Email or Password" };
            //updated loggedin status
            (yield model_1.UserInstance.update({
                isLoggedIn: true,
            }, {
                where: {
                    email: email,
                },
            }));
            const loggedinUser = (yield model_1.UserInstance.findOne({
                where: { email: email },
            }));
            const payload = {
                id: loggedinUser.id,
                email: loggedinUser.email,
                verified: loggedinUser.verified,
                isLoggedIn: loggedinUser.isLoggedIn,
                role: loggedinUser.role,
                is_premium: loggedinUser.is_premium,
            };
            const signature = yield (0, auth_utils_1.GenerateSignature)(payload);
            return res.status(200).json({
                message: "Login Successful",
                signature: signature,
                user: User,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
/* =============UPDATE=======================. */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const User = (yield model_1.UserInstance.findOne({
            where: { id: id },
        }));
        const { firstName, lastName, email, country, date_birth, gender } = req.body;
        const dateOfBirth = date_birth
            ? new Date(Number(date_birth.slice(6)), Number(date_birth.slice(3, 5)), Number(date_birth.slice(0, 2)))
            : User.date_birth;
        if (!User)
            throw { code: 401, message: "unAuthorised please Login" };
        const updatedUser = (yield model_1.UserInstance.update({
            firstName: firstName || User.firstName,
            lastName: lastName || User.lastName,
            email: email || User.email,
            country: country || User.country,
            gender: gender || User.gender,
            date_birth: dateOfBirth,
            profileImage: req.file ? req.file.path : User.profileImage,
        }, { where: { id: id } }));
        if (updatedUser) {
            const User = (yield model_1.UserInstance.findOne({
                where: { id: id },
            }));
            return res.status(200).json({
                message: "You have successfully updated your profile",
                User,
            });
        }
        throw { code: 500, message: "Something went wrong" };
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
/*================= verify User ================*/
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        if (typeof token === "string") {
            const verified = yield (0, auth_utils_1.verifySignature)(token);
            //check if user exits
            if (!verified)
                throw { code: 400, message: "Please Register An Account" };
            if (verified) {
                yield model_1.UserInstance.update({
                    verified: true,
                }, {
                    where: { id: verified.id },
                });
                return res.status(200).json({
                    message: "Account verified Please Login !",
                });
            }
        }
        throw { code: 401, message: "Unauthorized" };
    }
    catch (error) {
        next(error);
    }
});
exports.verifyUser = verifyUser;
/*================= logout======================*/
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    yield model_1.UserInstance.update({
        isLoggedIn: false,
    }, {
        where: { id: id },
    });
    return res.status(200).json({
        message: "Successfuly Loggedout",
    });
});
exports.logout = logout;
/*================= forgot Password ================*/
const requestPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = (yield model_1.UserInstance.findOne({
            where: { email: email },
        }));
        if (!user) {
            // __TEST MESSAGE__ wrong message this should be an error
            return res.status(200).json({
                code: 200,
                message: "Check Your Email to Continue !!",
            });
        }
        else {
            const otp = yield (0, auth_utils_1.GenerateSalt)();
            let token = yield (0, auth_utils_1.GenerateSignature)({
                id: user.id,
                email,
                otp,
            });
            yield model_1.UserInstance.update({
                otp: otp,
            }, {
                where: { id: user.id },
            });
            const template = yield (0, notification_1.passworTemplate)(user.userName, token);
            yield (0, notification_1.sendEmail)(user.email, "PASSWORD RESETE", template);
            // __TEST MESSAGE__ dont send token as response or user will be able to reset pwd without checking email
            res.status(200).json({
                code: 200,
                signature: token,
                message: "Check Your Email to Continue !!",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.requestPassword = requestPassword;
const changepassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        const data = yield (0, auth_utils_1.verifySignature)(token);
        const { id, email, otp } = data;
        const user = yield model_1.UserInstance.findOne({
            where: {
                email: email,
                otp,
            },
        });
        if (!user)
            throw { code: 401, message: "Not Valid" };
        const salt = yield (0, auth_utils_1.GenerateSalt)();
        const userPassword = yield (0, auth_utils_1.GeneratePassword)(password, salt);
        yield model_1.UserInstance.update({
            salt,
            password: userPassword,
            otp: "",
        }, {
            where: { id: id },
        });
        res
            .status(201)
            .json({ code: 201, message: "password updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.changepassword = changepassword;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const user = (yield model_1.UserInstance.findOne({
            where: { id },
        }));
        res.status(201).json({ code: 200, user });
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
//# sourceMappingURL=userHandler.js.map