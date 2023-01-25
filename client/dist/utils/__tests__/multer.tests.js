"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("../multer/multer");
describe("multer configurations should be accurate", () => {
    test("expect music config to be accurate", () => {
        const { format, folder } = multer_1.musicConfig;
        expect(format).toBe("mp3");
        expect(folder).toBe("SMOOVEAPPMUSIC");
    });
    test("expect profile config folder to be SMOOVEAPP", () => {
        const { folder } = multer_1.profileImgConfig;
        expect(folder).toBe("SMOOVEAPP");
    });
});
//# sourceMappingURL=multer.tests.js.map