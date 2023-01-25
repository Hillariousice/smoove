"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictToAdmin = void 0;
const restrictToAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin")
        throw {
            code: 403,
            message: "You do not have permission to perform this action",
        };
    next();
};
exports.restrictToAdmin = restrictToAdmin;
//# sourceMappingURL=admin.js.map