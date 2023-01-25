import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const getPlaylistSongs: (req: JwtPayload, res: Response, next: NextFunction) => Promise<void>;
export declare const addSongToPlaylist: (req: JwtPayload, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
