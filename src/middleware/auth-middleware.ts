import * as jwt from 'jsonwebtoken';

export function authorization(authRoles: string[]) {
    return (req, res, next) => {
        let isAuth: boolean = false;
        if (!req.cookies.token) {
            res.status(401).send('The incoming token has expired');
        } else {
            res.cookie('token', req.cookies.token, { expires: new Date(Date.now() + 3600000) });
            let user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            let role = user['role'];
            let userId = user['userId'];
            for (let userRole in role) {
                if (authRoles.includes(role[userRole])) {
                    isAuth = true;
                } else if (authRoles.includes('user') && userId === +req.params.id) {
                    isAuth = true;
                }
            }
            if (isAuth) {
                next();
            } else {
                res.status(403).send('Invalid Credentials');
            }
        }
    }
}