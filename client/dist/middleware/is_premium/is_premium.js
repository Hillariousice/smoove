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
exports.is_premium = void 0;
const model_1 = require("../../model");
const is_premium = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, id, is_premium, role } = req.user;
        const isPremium = () => {
            return is_premium || role === "admin" ? true : false;
        };
        console.log(isPremium);
        if (!isPremium)
            throw { code: 401, message: "please upgrade to Premuim Account !!" };
        const user = (yield model_1.UserInstance.findOne({
            where: {
                id: id,
                email: email,
            },
        }));
        if (user.is_premium || user.role === "admin") {
            next();
        }
        else {
            throw { code: 401, message: "please upgrade to Premuim Account !! " };
        }
    }
    catch (error) {
        next(error);
    }
});
exports.is_premium = is_premium;
//# sourceMappingURL=is_premium.js.map