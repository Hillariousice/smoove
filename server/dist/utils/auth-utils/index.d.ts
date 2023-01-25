import jwt from "jsonwebtoken";
import { UserPayload } from "../../interface";
import { PasswordPayload } from "../../interface/resetPassword.dto";
export declare const validatePassword: (enteredPassword: string, savedPassword: string, salt: string) => Promise<boolean>;
export declare const GenerateSalt: () => Promise<string>;
export declare const GeneratePassword: (password: string, salt: string) => Promise<string>;
export declare const GenerateSignature: (payload: UserPayload | PasswordPayload | {
    [key: string]: string | number | boolean | undefined;
}) => Promise<string>;
export declare const verifySignature: (signature: string) => Promise<jwt.JwtPayload>;
