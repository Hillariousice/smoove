import { Request, Response } from "express";
export declare const addCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllCategories: (req: Request, res: Response) => Promise<void>;
export declare const getCategoryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
