"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class UserInstance extends sequelize_1.Model {
    static patch(arg0, arg1) {
        throw new Error("Method not implemented.");
    }
}
exports.UserInstance = UserInstance;
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - userName
 *        - gender
 *        - date_birth
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: omo@yahoo.com
 *        userName:
 *          type: string
 *          default: omo ati
 *        gender:
 *          type: string
 *          default: male
 *        date_birth:
 *          type: string
 *          default: 7/2/1998
 *        password:
 *          type: string
 *          default: omo12345678
 *    CreateUserResponse:
 *      type: object
 *      required:
 *        - email
 *        - userName
 *        - gender
 *        - date_birth
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        userName:
 *          type: string
 *        gender:
 *          type: string
 *        date_birth:
 *          type: string
 *        _id:
 *          type: string
 *    CreateLoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    UpdateUserInput:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *        profileImage:
 *          type: any
 *        lastName:
 *          type: string
 *        address:
 *          type: string
 *        country:
 *          type: string
 *        password:
 *          type: string
 */
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Email is required",
            },
            isEmail: {
                msg: "Email is invalid",
            },
        },
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Username is required",
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "Password is required",
            },
        },
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isLoggedIn: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    date_birth: {
        type: sequelize_1.DataTypes.DATE,
    },
    isAceptedPrivacy: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    otp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    otp_expiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    lng: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Verification status is required",
            },
            notEmpty: {
                msg: "user not verified",
            },
        },
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    profileImage: {
        type: sequelize_1.DataTypes.STRING({ length: 1000 }),
        allowNull: true,
    },
    lan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isAceptedTerms: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    socials: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
    },
    facebookId: {
        type: sequelize_1.DataTypes.STRING,
    },
    googleId: {
        type: sequelize_1.DataTypes.STRING,
    },
    googleToken: {
        type: sequelize_1.DataTypes.STRING,
    },
    faceBookToken: {
        type: sequelize_1.DataTypes.STRING,
    },
    is_premium: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    sequelize: db_1.db,
    tableName: "user",
});
//# sourceMappingURL=userModel.js.map