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
const notification_1 = require("../notification");
describe("Email service test", () => {
    //commented out to save email credits
    // test("Should send an email successfully", async() =>{
    //     const sendMail = await Mailer('yinorhino@gmail.com',"Email test passed","<h1>Email test passed</h1>")
    //     const sent = sendMail?.response
    //     expect(sent).toContain("2.0.0 OK")
    // })
    test("Should throw error when subject", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield (0, notification_1.sendEmail)('yinorhino@gmail.com', "", "<h1>Email test passed</h1>");
        }
        catch (err) {
            const errorMessage = err === null || err === void 0 ? void 0 : err.message;
            expect(errorMessage).toBe("subject not specified");
        }
    }));
    test("Should throw error when html is not passed as argument", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield (0, notification_1.sendEmail)('yinorhino@gmail.com', "Email test passed", "");
        }
        catch (err) {
            const errorMessage = err === null || err === void 0 ? void 0 : err.message;
            console.log(err.message);
            expect(errorMessage).toBe("html template not specified");
        }
    }));
    test("Should throw error when to is not passed as argument", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield (0, notification_1.sendEmail)("", "Email test passed", "<h1>Email test passed</h1>");
        }
        catch (err) {
            const errorMessage = err === null || err === void 0 ? void 0 : err.message;
            console.log(err.message);
            expect(errorMessage).toBe("recipient(to) not specified");
        }
    }));
});
//# sourceMappingURL=sendMail.tests.js.map