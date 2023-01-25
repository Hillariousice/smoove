"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastInstance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class PodcastInstance extends sequelize_1.Model {
}
exports.PodcastInstance = PodcastInstance;
PodcastInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    episodeUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    song_duration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: db_1.db,
    tableName: "podcast",
});
//# sourceMappingURL=podcastModel.js.map