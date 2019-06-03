import { Response, Request } from "express";

export function corsFilter(req: Request, res: Response, next) {
    res.header('Access-Control-Allow-Origin', `${req.headers.origin}`) // this is a hack, if I do it in a project, Alec will be very disappointed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
}