import { Response, Request, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const CreateArtist: (req: JwtPayload, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const GetAllArtist: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const GetArtist: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
