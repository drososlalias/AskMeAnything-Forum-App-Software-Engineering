const landingController = async (req, res) => {
  return res.render("landing.ejs", {
    pageTitle: "Home Page",
    user : req.session.user,
    message : req.flash('success')[0]
  });
};
module.exports = { landingController };
