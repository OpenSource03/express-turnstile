import { NextFunction, Request, Response } from "express";
export declare const middleware: {
    validate: (secret: string) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
};
