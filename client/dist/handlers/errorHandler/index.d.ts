import { Request, Response, NextFunction } from "express";
export declare const errorHandler: (error: any, req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const errorRouterHandler: import("express-serve-static-core").Router;
