"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreRouter = exports.playedMusicRoute = exports.artistRoute = exports.playlistRoute = exports.musicRouter = exports.usersRoute = void 0;
var users_1 = require("./users");
Object.defineProperty(exports, "usersRoute", { enumerable: true, get: function () { return users_1.usersRoute; } });
var music_1 = require("./music");
Object.defineProperty(exports, "musicRouter", { enumerable: true, get: function () { return music_1.musicRouter; } });
var playlist_1 = require("./playlist");
Object.defineProperty(exports, "playlistRoute", { enumerable: true, get: function () { return playlist_1.playlistRoute; } });
var artist_1 = require("./artist");
Object.defineProperty(exports, "artistRoute", { enumerable: true, get: function () { return artist_1.artistRoute; } });
var recentMusic_1 = require("./recentMusic");
Object.defineProperty(exports, "playedMusicRoute", { enumerable: true, get: function () { return recentMusic_1.playedMusicRoute; } });
var genre_1 = require("./genre");
Object.defineProperty(exports, "genreRouter", { enumerable: true, get: function () { return genre_1.genreRouter; } });
//# sourceMappingURL=index.js.map