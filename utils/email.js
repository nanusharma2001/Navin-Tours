const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Navin Sharma <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      //Activate in Gmail "less secure app" option
    });
  }

  //Send the actual email
  async send(template, subject) {
    //1.Render HTML based on pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    //2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    //3.Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Our Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password token (valid for only 10 minutes)'
    );
  }
};

/*
const sendEmail = async (options) => {
  //1.Create a transporter
  // FOR USING GMAIL AS TRANSPORTER(NOT GOOD FOR LARGE PRODUCTION APP AS YOU WILL BE MARKED AS SPAM)
  //   const transporter = nodemailer.createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     password: process.env.EMAIL_PASSWORD,
  //   },
  //   //Activate in Gmail "less secure app" option
  // });
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //Activate in Gmail "less secure app" option
  });
  //2.)Define the email options
  const mailOptions = {
    from: 'Navin Sharma <navinsh2008@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:,
  };
  //3.Actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
*/
