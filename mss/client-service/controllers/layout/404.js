const pageNotFound = async  (req,res,next) =>{
    res.render("404.ejs", { pageTitle: "Page not found" });
    next();
}

module.exports = {pageNotFound}