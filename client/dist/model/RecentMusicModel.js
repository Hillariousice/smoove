"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayedMusicInstance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const musicModel_1 = require("./musicModel");
const userModel_1 = require("./userModel");
class PlayedMusicInstance extends sequelize_1.Model {
}
exports.PlayedMusicInstance = PlayedMusicInstance;
PlayedMusicInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    songId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: db_1.db,
    tableName: "recentMusic",
});
userModel_1.UserInstance.hasMany(PlayedMusicInstance, {
    foreignKey: "userId"
});
PlayedMusicInstance.belongsTo(userModel_1.UserInstance, {
    foreignKey: "userId"
});
musicModel_1.MusicInstance.hasOne(PlayedMusicInstance, {
    foreignKey: "songId"
});
PlayedMusicInstance.belongsTo(musicModel_1.MusicInstance, {
    foreignKey: "songId"
});
//# sourceMappingURL=RecentMusicModel.js.map