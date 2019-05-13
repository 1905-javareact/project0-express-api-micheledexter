import * as session from 'express-session';

const newSession = {
    secret: 'secret',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
}

export const sessionMiddleware = session(newSession);