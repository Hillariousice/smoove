import { Request, Response } from 'express';
export declare const addGenre: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllGenres: (req: Request, res: Response) => Promise<void>;
export declare const getAllGenresLimit: (req: Request, res: Response) => Promise<void>;
export declare const getGenreById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editGenre: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteGenre: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
