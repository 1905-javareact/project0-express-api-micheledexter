export function authorization(authRoles: string[]) {
    return (req, res, next) => {
        let isAuth: boolean = false;
        if (!req.session.user) {
            res.status(401).send('The incoming token has expired');
        }
        let role = req.session.user.role;
        for (let userRole in role) {
            if (authRoles.includes(role[userRole])) {
                isAuth = true;
            } else if (authRoles.includes('user') && req.session.user.userId === +req.params.id) {
                isAuth = true;
            }
        }
        if (isAuth) {
            next();
        } else {
            res.status(400).send('Invalid Credentials');
        }
    }
}