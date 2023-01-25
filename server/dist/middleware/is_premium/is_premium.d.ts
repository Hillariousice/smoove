import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const is_premium: (req: JwtPayload, res: Response, next: NextFunction) => Promise<void>;
