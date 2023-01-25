"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistInstance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const musicModel_1 = require("./musicModel");
class ArtistInstance extends sequelize_1.Model {
}
exports.ArtistInstance = ArtistInstance;
ArtistInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    instagramUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    twitterUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: db_1.db,
    tableName: "artists"
});
ArtistInstance.hasMany(musicModel_1.MusicInstance, {
    foreignKey: "artistId", as: "music"
});
musicModel_1.MusicInstance.belongsTo(ArtistInstance, {
    foreignKey: "artistId", as: 'artists'
});
//# sourceMappingURL=artistModel.js.map