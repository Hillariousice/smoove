import { Model } from "sequelize";
import { genreAttributes } from "../interface/genreAttributes";
export declare class genreInstance extends Model<genreAttributes> {
    static findById(id: string): void;
    static find: any;
}
