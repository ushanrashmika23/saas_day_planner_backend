const isActiveUser = (req, res, next) => {
    if(!req.user)
        return res.status(401).json({ statusCode: 401, message: 'Unauthorized: No user found', data: null });

    if(!req.user.isActive)
        return res.status(403).json({ statusCode: 403, message: 'Forbidden: User account is inactive', data: null });

    next();
}

module.exports = isActiveUser;