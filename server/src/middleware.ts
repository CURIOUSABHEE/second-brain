import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { secret } from "./config";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    const decoded = jwt.verify(header as string, secret) as { id: string };
    if (decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.json(403).json({
            message: "You are not logged in",
        })
    }

}