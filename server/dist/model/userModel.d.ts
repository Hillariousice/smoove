import { Model } from "sequelize";
import { UserAttributes } from "../interface/UserAttributes";
export declare class UserInstance extends Model<UserAttributes> {
    static patch(arg0: {
        is_premium: boolean;
    }, arg1: {
        where: {
            id: any;
        };
    }): unknown;
}
