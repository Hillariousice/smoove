"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const { DATABASE_DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = index_1.default;
exports.db = new sequelize_1.Sequelize(DATABASE_DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
});
//# sourceMappingURL=db.js.map