import { Response, Request, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserPayload } from "../../interface";
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const auth: (req: JwtPayload, res: Response, next: NextFunction) => Promise<void>;
export declare const Premium: (req: JwtPayload, res: Response, next: NextFunction) => void;
