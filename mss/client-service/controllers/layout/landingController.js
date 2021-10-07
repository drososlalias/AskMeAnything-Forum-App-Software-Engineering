const landingController = async (req, res) => {
  res.render("landing.ejs", {
    pageTitle: "Home Page",
    user : req.session.user
  });
};
module.exports = { landingController };
