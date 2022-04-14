module.exports =  (req, res, next) => {
    if (!req.session.isAuthenticated) {
        res.redirect("/login");
        next();
    }
}