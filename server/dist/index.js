"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const index_1 = __importDefault(require("./config/index"));
const server_1 = __importDefault(require("./server"));
const options = {
    key: fs_1.default.readFileSync(process.env.HTTPS_KEY_PATH, "utf8"),
    cert: fs_1.default.readFileSync(process.env.HTTPS_CERT_PATH, "utf8"),
};
exports.default = https_1.default.createServer(options, server_1.default).listen(index_1.default.port, () => {
    console.log(`Server running on port ${index_1.default.port}`);
});
//# sourceMappingURL=index.js.map