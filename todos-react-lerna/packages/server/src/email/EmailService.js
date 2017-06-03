const nodemailer = require('nodemailer');
const settings = require('../settings');

function EmailService() { }

EmailService.sendEmail = (mailOptions, callback) => {
  // create reusable transporter object using the default SMTP transport
  // let smtpConfig = {
  //   host: 'smtp.126.com',
  //   port: 994,
  //   secure: true, // use TLS
  //   auth: {
  //     user: 'user@126.com',
  //     pass: 'pass'
  //   }
  // };
  let transporter = nodemailer.createTransport(settings.email.smtpConfig);

  // let mailOptions = {
  //   from: 'user@126.com',    // sender address
  //   to: ['who@126.com'],     // list of receivers
  //   subject: 'Hello World',  // Subject line
  //   text: 'Hello World',     // plain text body
  //   html: 'Hello World'      // html body
  // };
  mailOptions.from = settings.email.sender;

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      callback(error);
    }
    
    console.log('Message %s sent: %s', info.messageId, info.response);
    callback(error, { messageId: info.messageId, response: info.response });

    transporter.close();
  });
}

module.exports = EmailService;