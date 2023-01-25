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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_utils_1 = require("../auth-utils");
// import { GenerateSalt, GeneratePassword } from "../auth-utils";
const [password, invalidData] = ["1234abcd", "invalidPassword"];
const payload = {
    payload: "payload",
    password,
};
// let salt:string,salt2:string,hashedPassword2:string,hashedPassword:string;
let salt, hashedPassword, salt2, isValidPassword, isNotValidPassword;
let hashedPassword2, signature, isValidSignature;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    salt = yield (0, auth_utils_1.GenerateSalt)();
    salt2 = yield (0, auth_utils_1.GenerateSalt)();
    hashedPassword = yield (0, auth_utils_1.GeneratePassword)(password, salt);
    hashedPassword2 = yield (0, auth_utils_1.GeneratePassword)(password, salt2);
    isValidPassword = yield (0, auth_utils_1.validatePassword)(password, hashedPassword, salt);
    isNotValidPassword = yield (0, auth_utils_1.validatePassword)(invalidData, hashedPassword, salt);
    signature = yield (0, auth_utils_1.GenerateSignature)(payload);
    isValidSignature = yield (0, auth_utils_1.verifySignature)(signature);
    // isNotValidSignature = await verifySignature(invalidData);
}));
describe("test Generate Salt function", () => {
    test("should generate salt", () => {
        expect(salt).toBeDefined();
    });
    test("should generate different random salts", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(salt).not.toBe(salt2);
    }));
});
describe("test Generate Password function", () => {
    test("should generate password", () => {
        expect(hashedPassword).toBeDefined();
    });
    test("should generate different random passwords", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(hashedPassword).not.toBe(hashedPassword2);
    }));
});
describe("test Validate Password function", () => {
    test("should validate correct password and salt", () => {
        expect(isValidPassword).toBe(true);
    });
    test("should not validate incorrect entered password", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(isNotValidPassword).toBe(false);
    }));
    test("should not validate incorrect entered salt", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield (0, auth_utils_1.validatePassword)(password, hashedPassword, invalidData);
        }
        catch (err) {
            expect(err.message).toBe("Invalid salt. Salt must be in the form of: $Vers$log2(NumRounds)$saltvalue");
        }
    }));
});
describe("test Generate Signature function", () => {
    test("should generate signature", () => {
        expect(signature).toBeDefined();
    });
});
describe("test Verify Signature function", () => {
    test("should verify correct signature", () => {
        expect(isValidSignature).toBeDefined();
    });
    test("should not verify incorrect signature", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield (0, auth_utils_1.verifySignature)(invalidData);
        }
        catch (err) {
            expect(err).toBeInstanceOf(jsonwebtoken_1.JsonWebTokenError);
        }
    }));
});
//# sourceMappingURL=auth-utils.tests.js.map