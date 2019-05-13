function statusMessage(res) {
    res.status(401).send('The incoming token has expired');
}

export function authorization(authRoles: string[]) {
    return (req, res, next) => {
        let isAuth: boolean = false;
        if (!req.session.user) {
            statusMessage(res);
        }
        for (let userRole of req.session.user.roles) {
            if (authRoles.includes(userRole)) isAuth = true;
        }
        if (isAuth) {
            next();
        } else {
            statusMessage(res);
        }
    }
}

// export function adminAuth(req, res, next) {
//     if (req.session.user && req.session.user.roles.includes('admin')) {
//         next();
//     } else {
//         statusMessage(res);
//     }
// }

// export function financeAuth(req, res, next) {
//     if (req.session.user && req.session.user.roles.includes('finance-manager')) {
//         next();
//     } else {
//         statusMessage(res);
//     }
// }