const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')
const transporter = nodemailer.createTransport(sendGridTransport({
  auth: {
    api_key:'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'
  }}))

const contactusController = async (req, res) => {
    res.render("contactus.ejs", { pageTitle: "Contact Us" });
  };
  
const sendEmail = async (req, res) => {

    const message = req.body.message;
    res.redirect('/');
    return transporter.sendMail({
      to : 'patrasnicholas@gmail.com ',
      from: 'drososlalias@gmail.com',
      subject: '#AskMeAnything',
      html: `<h1>${message}</h1>`
    })
};
  

  module.exports = { contactusController, sendEmail };
  