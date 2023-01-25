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
const auth_tests_1 = require("../../middleware/__tests__/auth.tests");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe("valid user routes tests", () => {
    it('POST /api/user/signin ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).post("/api/user/signin")
            .send({ email: auth_tests_1.testUser.email, password: auth_tests_1.testUser.password });
        expect(statusCode).not.toEqual(404);
    }));
    it('POST /api/user/signup ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).post("/api/user/signup")
            .send({ email: auth_tests_1.testUser.email, password: auth_tests_1.testUser.password });
        expect(statusCode).not.toEqual(404);
    }));
    it('PATCH /api/users/update ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).patch("/api/user/update")
            .send(auth_tests_1.testUser);
        expect(statusCode).not.toEqual(404);
    }));
    it('PATCH /api/user/get-user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).get("/api/user/get-user");
        expect(statusCode).not.toEqual(404);
    }));
    it('POST /api/user/resetpassword ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).post("/api/user/resetpassword");
        expect(statusCode).not.toEqual(404);
    }));
    it('PATCH /api/user/verify', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).patch("/api/user/verify");
        expect(statusCode).not.toEqual(404);
    }));
    it('GET /api/users/changepassword ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(server_1.default).post("/api/user/changepassword");
        expect(statusCode).not.toEqual(404);
    }));
});
//# sourceMappingURL=usersroute.tests.js.map