module.exports =  (req, res, next) => {
    if (!req.session.isAuthenticated) {
        req.session.redirectTo = req.url;
        res.redirect("/login");
    }
    next();
}