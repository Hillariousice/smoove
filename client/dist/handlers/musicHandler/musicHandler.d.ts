import { Response, NextFunction, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const AdminMusic: (req: JwtPayload, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const premium_create: (req: JwtPayload, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllMusic: (req: Request, res: Response, next: NextFunction) => Promise<void>;
