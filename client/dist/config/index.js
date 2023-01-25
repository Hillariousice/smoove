"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const lodash_merge_1 = __importDefault(require("lodash.merge"));
//making sure NODE_ENV is set, defult is "developement"
// process.env.NODE_ENV = process.env.NODE_ENV || "developement";
//set stage
const stage = process.env.STAGE || "local";
let envConfig;
//dynamically require each config depending on the stage we are in
if (stage === "production") {
    //set config to production
    envConfig = require("./prod").default;
}
else if (stage === "testing") {
    envConfig = require("./testing").default;
}
else {
    envConfig = require("./local").default;
}
// export along with marge
exports.default = (0, lodash_merge_1.default)({
    stage,
}, envConfig);
//# sourceMappingURL=index.js.map