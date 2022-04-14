module.exports =  (req, res, next) => {
    if (!req.session.isAuthenticated) {
        return res.redirect("/login");
    }
    if (!req.user.isAdmin) {
        return res.redirect("/");
    }
    next();
}