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
exports.testUser = void 0;
const supertest_1 = __importDefault(require("supertest"));
const auth_utils_1 = require("../../utils/auth-utils");
const userModel_1 = require("../../model/userModel");
const uuid_1 = require("uuid");
const server_1 = __importDefault(require("../../server"));
const auth_1 = require("../auth/auth");
const email = "SMOOZE@gmail.com";
const id1 = (0, uuid_1.v4)();
const id2 = (0, uuid_1.v4)();
const id3 = (0, uuid_1.v4)();
let request = (0, supertest_1.default)(server_1.default);
let token;
let adminToken;
exports.testUser = {
    id: id2,
    password: "1234abcd",
    salt: "hello",
    userName: "Smooze",
    is_premium: false,
    firstName: "SMOOZE",
    lastName: "SMOOZE",
    email,
    country: "Nigeria",
    gender: "male",
    verified: true,
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.UserInstance.bulkCreate([{
                id: id1,
                password: "1234abcd",
                salt: "hello",
                userName: "unverified",
                is_premium: false,
                firstName: "SMOOZE",
                lastName: "SMOOZE",
                email: "unverifiedUser@gmail.com",
                country: "Nigeria",
                gender: "male",
                verified: false,
            },
            exports.testUser,
            {
                id: id3,
                password: "1234abcd",
                salt: "hello",
                userName: "Smoozeadmin",
                is_premium: false,
                firstName: "SMOOZE",
                lastName: "SMOOZE",
                email: "smoozeadmintest@gmail.com",
                country: "Nigeria",
                gender: "male",
                verified: true,
                role: "admin"
            }
        ]);
    }
    catch (err) {
        console.log(err);
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.UserInstance.destroy({ where: { email: [email, "unverifiedUser@gmail.com", "smoozeadmintest@gmail.com"] } });
}));
describe("auth middleware integration tests", () => {
    const exec = () => {
        return request
            .patch('/api/user/update')
            .set("Authorization", `Bearer ${token}`)
            .trustLocalhost(true)
            .send({
            firstName: "SMOOZE",
            lastName: "SMOOZE",
            email: "SMOOZE@gmail.com",
            country: "Nigeria",
            gender: "male"
        });
    };
    const execNoToken = () => {
        return request
            .patch('/api/user/update')
            .trustLocalhost(true)
            .send({
            firstName: "SMOOZE",
            lastName: "SMOOZE",
            email: "SMOOZE@gmail.com",
            country: "Nigeria",
            gender: "male"
        });
    };
    it("should return 400 if token is not specified", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield execNoToken();
        expect(response.status).toBe(400);
    }));
    it("should return 400 if token is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        token = "";
        const response = yield exec();
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("jwt must be provided");
    }));
    it("should return 400 if token is correct but user is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield exec();
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("jwt must be provided");
    }));
    it("should return 400 if token is correct and user is valid but user is not verified", () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, auth_utils_1.GenerateSignature)({ email: 'unverifiedUser@gmail.com', id: id1, verified: false, isLoggedIn: true });
        const response = yield exec();
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Account Not Activated");
    }));
    it("should return 200 if token is correct and user is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, auth_utils_1.GenerateSignature)({ email: 'SMOOZE@gmail.com', id: id2, verified: false, isLoggedIn: true });
        const response = yield exec();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("You have successfully updated your profile");
    }));
});
describe("admin auth middleware integration tests", () => {
    const exec = () => {
        return request
            .patch('/api/admin/update')
            .set("Authorization", `Bearer ${adminToken}`)
            .trustLocalhost(true)
            .send({
            firstName: "SMOOZE",
            lastName: "SMOOZE",
            email: "SMOOZE@gmail.com",
            country: "Nigeria",
            gender: "male"
        });
    };
    const execNoToken = () => {
        return request
            .patch('/api/admin/update')
            .trustLocalhost(true)
            .send({
            firstName: "SMOOZE",
            lastName: "SMOOZE",
            email: "SMOOZE@gmail.com",
            country: "Nigeria",
            gender: "male"
        });
    };
    it("should return 400 if token is not specified", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield execNoToken();
        expect(response.status).toBe(400);
    }));
    it("should return 400 if token is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        token = "";
        const response = yield exec();
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("jwt must be provided");
    }));
    it("should return 400 if token is correct but user is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield exec();
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("jwt must be provided");
    }));
    it("should return 400 if token is correct and user is valid but user is not an admin", () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, auth_utils_1.GenerateSignature)({ email, id: id2, verified: true, isLoggedIn: true });
        const response = yield exec();
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("You are not an admin");
    }));
    it("should return 200 if token is correct and user is an admin", () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, auth_utils_1.GenerateSignature)({ email: 'smoozeadmintest@gmail.com', id: id3, verified: true, isLoggedIn: true });
        const response = yield exec();
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("You have successfully updated the user profile");
    }));
});
describe("auth middleware unit tests", () => {
    let req;
    let res;
    let next = jest.fn();
    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
        };
    });
    it("should call next function with no arguments if token is correct and verified", () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, auth_utils_1.GenerateSignature)({ email, id: id2, verified: true, isLoggedIn: true });
        console.log(token);
        req = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        res = {};
        next = jest.fn();
        (0, auth_1.auth)(req, res, next);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith();
        expect(req.user).toBeDefined();
    }));
    it("should call next with error if user is not verified", () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, auth_utils_1.GenerateSignature)({ email: 'unverified@gmail.com', id: id1, verified: true, isLoggedIn: true });
        req = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        res = {};
        next = jest.fn();
        (0, auth_1.auth)(req, res, next);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith({ code: 400, message: expect.any(String) });
    }));
    it("should call next with error if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        token = yield (0, auth_utils_1.GenerateSignature)({ email: 'unverified@gmail.com', id: "1234", verified: true, isLoggedIn: true });
        req = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        res = {};
        next = jest.fn();
        (0, auth_1.auth)(req, res, next);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith({ code: 400, message: expect.any(String) });
    }));
});
// describe("admin auth middleware unit tests",()=>{
//     let req: Partial<JwtPayload>;
//     let res: Partial<Response>;
//     let next: NextFunction = jest.fn();
//     beforeEach(() => {
//       req = {};
//       res = {
//         json: jest.fn(),
//       };
//     });
//     it("should call next function with no arguments if user is an admin", async()=>{
//         token = await GenerateSignature({email,id:id3,verified:true,isLoggedIn: true});
//         console.log(token)
//         req = {
//             headers:{
//                 Authorization: `Bearer ${token}`
//             }
//         }
//         res = {}
//         next = jest.fn()
//         adminauth(req as JwtPayload, res as Response, next)
//         expect(next).toBeCalledTimes(1);
//         expect(next).toBeCalledWith();
// expect(req.user).toBeDefined()
//     })
//     it("should call next with error if user is not an admin", async()=>{
//         token = await GenerateSignature({email:'unverified@gmail.com',id:id1,verified:true,isLoggedIn: true});
//         req = {
//             headers:{
//                 Authorization: `Bearer ${token}`
//             }
//         }
//         res = {}
//         next = jest.fn()
//         adminauth(req as JwtPayload, res as Response, next)
//         expect(next).toBeCalledTimes(1);
//         expect(next).toBeCalledWith({ code: 400, message: "Unauthorised" });
//     })
// })
//# sourceMappingURL=auth.tests.js.map