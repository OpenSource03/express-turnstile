import { NextFunction, Request, Response } from "express";
export declare const turnstile: {
    validate: (secret: string) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
};
