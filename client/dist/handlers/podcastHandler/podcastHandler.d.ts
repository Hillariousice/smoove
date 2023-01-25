import { NextFunction, Request, Response } from "express";
export declare const createPodcast: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllPodcast: (req: Request, res: Response) => Promise<void>;
export declare const getPodcastById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updatePodcast: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletePodcast: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
