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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe("valid music routes tests", () => {
    it('DELETE /api/music/delete/1234 ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).delete("/api/music/delete/1234");
        expect(statusCode).not.toEqual(404);
    }));
    it('PUT /api/music/update/1234 ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).put("/api/music/update/1234");
        expect(statusCode).not.toEqual(404);
    }));
    it('POST /api/music/create ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).post("/api/music/create")
            .send({});
        expect(statusCode).not.toEqual(404);
    }));
    it('GET /api/music ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).get("/api/music");
        expect(statusCode).not.toEqual(404);
    }));
    it('GET /api/music/prem_create ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).post("/api/music/prem_create");
        expect(statusCode).not.toEqual(404);
    }));
});
//# sourceMappingURL=musicroutes.tests.js.map