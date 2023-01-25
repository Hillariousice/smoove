"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcategoryInstance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class PodcategoryInstance extends sequelize_1.Model {
}
exports.PodcategoryInstance = PodcategoryInstance;
PodcategoryInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    categoryImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db_1.db,
    tableName: "category",
});
//# sourceMappingURL=podcategoryModel.js.map