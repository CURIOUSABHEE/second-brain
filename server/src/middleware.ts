import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { secret } from "./config.js";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    try {

        const decoded = jwt.verify(header as string, secret) as { id: string };
        if (decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: "You are not logged in",
            })
        }
    } catch (e) {
        console.log(e);
        res.json({
            message: "something is wrong with tokens and jwt"
        })
    }

}