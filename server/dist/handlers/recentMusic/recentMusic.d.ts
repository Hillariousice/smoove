import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const CreatePlayedMusic: (req: JwtPayload, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const DisplayPlayedMusic: (req: JwtPayload, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
