const aboutController = async (req, res) => {
    return res.render("about.ejs", { pageTitle: "About"});
  };
  
  module.exports = { aboutController };
  