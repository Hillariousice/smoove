import { Request, Response, NextFunction } from "express";
export declare const option: {
    abortEarly: boolean;
    errors: {
        wrap: {
            label: string;
        };
    };
};
export declare const updateUserJoi: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginUserJoi: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const RegisterUserJoi: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const createUserJoi: (req: Request, res: Response, next: Function) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sendemailTokenJoi: (req: Request, res: Response, next: Function) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const changePasswordJoi: (req: Request, res: Response, next: Function) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createArtistJoi: (req: Request, res: Response, next: Function) => Promise<Response<any, Record<string, any>> | undefined>;
