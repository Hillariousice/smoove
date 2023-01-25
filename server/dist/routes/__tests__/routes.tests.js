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
describe("expects all invalid routes or request method to return 404", () => {
    it('GET /api/users/login ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default).get("/api/user/login");
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    }));
    it('GET /api/users/signup ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default).get("/api/user/signup");
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    }));
    it('POST /api/users/update ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default).post("/api/user/update");
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    }));
    it('PATCH /api/users/get-user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default).patch("/api/user/get-user");
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    }));
    it('POST /api/users/updates ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default).get("/api/user/updates");
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    }));
    it('GET /api/users/logins', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default).get("/api/user/logins");
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    }));
    it('GET /api/users/signups ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default).get("/api/user/signup");
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    }));
});
//# sourceMappingURL=routes.tests.js.map