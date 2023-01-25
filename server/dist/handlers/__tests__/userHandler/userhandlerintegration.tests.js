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
const server_1 = __importDefault(require("../../../server"));
const model_1 = require("../../../model");
const auth_tests_1 = require("../../../middleware/__tests__/auth.tests");
const auth_utils_1 = require("../../../utils/auth-utils");
const user = {
    email: "smooze@gmail.com",
    userName: "smooze",
    password: "1234abcd",
    gender: "male",
    date_birth: "30-04-1982"
};
let token;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.UserInstance.create(auth_tests_1.testUser);
    token = yield (0, auth_utils_1.GenerateSignature)({ email: auth_tests_1.testUser.email, id: auth_tests_1.testUser.id, verified: true, isLoggedIn: true });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.UserInstance.destroy({ where: { id: auth_tests_1.testUser.id } });
    yield model_1.UserInstance.destroy({ where: { email: user.email } });
}));
describe("/api/user/login tests", () => {
    it('should not login unregistered users', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/login")
            .send({
            email: "smooze@unregistedemail.com",
            password: user.password,
        });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    }));
    it('should not login without email', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/login")
            .send({
            password: user.password,
        });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    }));
    it('should not login without password', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/login")
            .send({
            email: "smooze@unregistedemail.com",
        });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    }));
    it('should not login unverified users', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/login")
            .send({
            email: user.email,
            password: user.password,
        });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    }));
    it('should login registered users successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        yield model_1.UserInstance.create(auth_tests_1.testUser);
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/login")
            .send({
            email: auth_tests_1.testUser.email,
            password: auth_tests_1.testUser.password,
        });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            "message": "Login successful"
        }));
    }));
});
describe("/api/user/signup tests", () => {
    it('should not register without email', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/signup")
            .send({
            password: user.password,
        });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    }));
    it('should not register invalid data', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/signup")
            .send({
            email: user.email,
            password: user.password,
        });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    }));
    it('should register user with correct data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/signup")
            .send(user);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            "message": "Login successful"
        }));
    }));
});
describe("/api/user/update tests", () => {
    it('should not update if no data is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/update")
            .set("Authorization", `Bearer ${token}`);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400
        }));
    }));
    it('should update if one data is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.UserInstance.create(auth_tests_1.testUser);
        token = yield (0, auth_utils_1.GenerateSignature)({ email: auth_tests_1.testUser.email, id: auth_tests_1.testUser.id, verified: true, isLoggedIn: true });
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/update")
            .set("Authorization", `Bearer ${token}`)
            .send({
            email: user.email
        });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    }));
    it('should update if all data is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/signup")
            .set("Authorization", `Bearer ${token}`)
            .send(user);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            "message": "Login successful"
        }));
    }));
    it('should not update if token is not provided or user is not verified', () => __awaiter(void 0, void 0, void 0, function* () {
        let { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/signup")
            .send(user);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            "message": "Login successful"
        }));
        // { statusCode, body } = await request(app)
        // .post("/api/user/signup")
        // .send(user)
        // expect(statusCode).toEqual(404);
        // expect(body).toEqual(expect.objectContaining({
        //     "code": 200,
        //     "message": "Login successful"
        // }));
    }));
});
describe("/api/user/restpassword tests", () => {
    it('should not send token if user is not registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/restpassword")
            .send({ email: "fakeuser@email.com" });
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            "code": 401,
            "message": "you are not registered"
        }));
    }));
    it('should send token email but not in response to  if user is registered', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/restpassword")
            .send({ email: auth_tests_1.testUser.email });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            message: "Check Your Email to Continue !!"
        }));
    }));
});
// id: user.id,
// email,
// otp,
describe("/api/user/changepassword tests", () => {
    const userWithOtp = Object.assign(Object.assign({}, auth_tests_1.testUser), { otp: "" });
    let resetPwdToken = "";
    let fakeToken = "";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        userWithOtp.otp = yield (0, auth_utils_1.GenerateSalt)();
        yield model_1.UserInstance.create(auth_tests_1.testUser);
        resetPwdToken = yield (0, auth_utils_1.GenerateSignature)({ id: auth_tests_1.testUser.id, email: auth_tests_1.testUser.email, otp: userWithOtp.otp });
        fakeToken = yield (0, auth_utils_1.GenerateSignature)({ id: "1234", email: "fake@gmail.com", otp: "1234" });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield model_1.UserInstance.destroy({ where: { id: userWithOtp.id } });
    }));
    it('should not change password if token is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/changepassword")
            .send({ token: fakeToken, password: "1234" });
        const { statusCode: statusCode2, body: body2 } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/changepassword")
            .send({ token: "wrontoken", password: "1234" });
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            "code": 401,
            "message": "you are not registered"
        }));
        expect(statusCode2).toEqual(401);
        expect(body2).toEqual(expect.objectContaining({
            "code": 401,
            "message": "you are not registered"
        }));
    }));
    it('should not change password if token is not specified', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/changepassword")
            .send({ token: "", passowrd: "1234" });
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            "code": 401,
            "message": "you are not registered"
        }));
    }));
    it('should change password if user is registered and token is correct and should be able to log in after changing password', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPassword = "12345678";
        const { statusCode, body } = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/restpassword")
            .send({ token: resetPwdToken, password: newPassword });
        const isLoggedIn = yield (0, supertest_1.default)(server_1.default)
            .post("/api/user/signin")
            .send({ email: userWithOtp.email, password: newPassword });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            message: "password updated successfully"
        }));
        expect(isLoggedIn.status).toBe(200);
    }));
});
//# sourceMappingURL=userhandlerintegration.tests.js.map