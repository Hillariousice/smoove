"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const config_1 = __importDefault(require("../config"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const playlist = path_1.default.resolve(__dirname, "../../src/routes/playlist.ts");
const music = path_1.default.resolve(__dirname, "../../src/routes/music.ts");
const user = path_1.default.resolve(__dirname, "../../src/routes/users.ts");
// const apiRoute = path.resolve(__dirname, "../../src/routes*.ts");
const apiSchema = path_1.default.resolve(__dirname, "../../src/model/*.ts");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger API Documentation for Smooze App",
            version: "1.0.0",
            description: "Documenting various apis for Smooze App",
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerformat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        host: "localhost:7000",
        basePath: "/",
    },
    // apis: [apiRoute, apiSchema],
    apis: [apiSchema, playlist, music, user],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//
const swaggerDocs = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.get("/docs.json", (req, res) => {
        res.setHeader("content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`Docs available at https://localhost:${config_1.default.port}/api-docs`);
};
exports.swaggerDocs = swaggerDocs;
//# sourceMappingURL=swagger.js.map