const postLogout = async (req, res) => {
    req.session.destroy(err => {
        res.redirect("/");
    });
};
module.exports = { postLogout };
