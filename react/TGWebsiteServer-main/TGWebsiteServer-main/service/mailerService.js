const nodemailer = require('nodemailer');

module.exports = async ({ to, from, subject, template, text }) => {
  // set your own mail server :)
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    // secure: false,
    auth: {
      user: 'super.full.dev@gmail.com',
      pass: 'NyMdAIGYU9JZVct1'
    }
  });

  try {
    let info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html: template
    });

    return {
      success: true,
      info
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err
    };
  }
};
