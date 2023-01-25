"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreInstance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const musicModel_1 = require("./musicModel");
class genreInstance extends sequelize_1.Model {
    static findById(id) {
        throw new Error('Method not implemented.');
    }
}
exports.genreInstance = genreInstance;
genreInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    genreImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db_1.db,
    tableName: "genre"
});
genreInstance.hasMany(musicModel_1.MusicInstance, {
    foreignKey: "genreId", as: 'music'
});
musicModel_1.MusicInstance.belongsTo(genreInstance, {
    foreignKey: "genreId", as: 'genre'
});
//# sourceMappingURL=genreModel.js.map