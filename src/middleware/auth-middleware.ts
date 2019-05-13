function expiredStatusMessage(res) {
    res.statusMessage = 'The incoming token has expired';
    res.sendStatus(401);
}

export function authorization(authRoles: string[]) {
    return (req, res, next) => {
        let isAuth: boolean = false;
        if (!req.session.user) {
            expiredStatusMessage(res);
        }
        for (let userRole of req.session.user.roles) {
            if (authRoles.includes(userRole)) isAuth = true;
        }
        if (isAuth) {
            next()
        } else {
            expiredStatusMessage(res);
        }
    }
}

export function adminAuth(req, res, next) {
    if (req.session.user && req.session.user.roles.includes('admin')) {
        next();
    } else {
        expiredStatusMessage(res);
    }
}

export function financeAuth(req, res, next) {
    if (req.session.user && req.session.user.roles.includes('finance-manager')) {
        next();
    } else {
        expiredStatusMessage(res);
    }
}