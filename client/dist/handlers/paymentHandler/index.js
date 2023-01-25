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
exports.paymentMethod = void 0;
const model_1 = require("../../model");
const auth_utils_1 = require("../../utils/auth-utils");
const notification_1 = require("../../utils/notification");
const config_1 = __importDefault(require("../../config"));
const paymentMethod = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const { paystackResponse, transactionref } = req.body;
        console.log(transactionref);
        if (paystackResponse === "success") {
            (yield model_1.UserInstance.update({
                is_premium: true,
            }, { where: { id: id } }));
            const updatedUser = (yield model_1.UserInstance.findOne({
                where: { id: id },
            }));
            if (updatedUser.is_premium) {
                const payload = {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    verified: updatedUser.verified,
                    isLoggedIn: updatedUser.isLoggedIn,
                    role: updatedUser.role,
                    is_premium: updatedUser.is_premium,
                };
                const signature = yield (0, auth_utils_1.GenerateSignature)(payload);
                return res.status(200).json({
                    message: "Congratulations, you are now a Premium User",
                    signature: signature,
                    updatedUser,
                });
            }
            else {
                let html = `${updatedUser.email} tried to upgrade but failed @ ${new Date().getDate()}`;
                yield (0, notification_1.sendEmail)(`${config_1.default.FROM_ADMIN_EMAIL}`, "Failt upgrade", html);
                throw {
                    code: 500,
                    message: "Could not update",
                    //send admin message
                };
            }
        }
        else {
            throw {
                code: 400,
                message: "Your Payment Failed",
            };
        }
    }
    catch (err) {
        next(err);
    }
});
exports.paymentMethod = paymentMethod;
//# sourceMappingURL=index.js.map