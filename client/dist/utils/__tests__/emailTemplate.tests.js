"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("../notification");
const [firstname, token] = ["smooze", "token"];
describe("Welcome email template function test", () => {
    const htmlTemplate = (0, notification_1.welcomeEmail)(firstname, token);
    test("expect template to be generated ", () => {
        expect(typeof htmlTemplate).toBe("string");
        expect(htmlTemplate.length).toBeGreaterThan(5);
    });
    test("expect template to contain exact token and firstname", () => {
        expect(htmlTemplate).toContain(token);
        expect(htmlTemplate).toContain(firstname);
    });
    test("expect function to throw error when firstname is not specified ", () => {
        expect.assertions(1);
        try {
            (0, notification_1.welcomeEmail)("", token);
        }
        catch (err) {
            const errorMessage = err === null || err === void 0 ? void 0 : err.message;
            expect(errorMessage).toBe("firstname is not specified");
        }
    });
    test("expect function to throw error when token is not specified ", () => {
        expect.assertions(1);
        try {
            (0, notification_1.welcomeEmail)(firstname, "");
        }
        catch (err) {
            const errorMessage = err === null || err === void 0 ? void 0 : err.message;
            expect(errorMessage).toBe("token is not specified");
        }
    });
});
//# sourceMappingURL=emailTemplate.tests.js.map