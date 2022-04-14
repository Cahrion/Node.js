exports.get404Page = (req, res) => {
    res.status(404).render('404', {title: '404'});
}