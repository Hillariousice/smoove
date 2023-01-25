import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const paymentMethod: (req: JwtPayload, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
