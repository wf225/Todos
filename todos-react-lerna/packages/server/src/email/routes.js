let EmailService = require("./EmailService");

module.exports = function (app) {

  app.post('/api/email', (req, res) => {
    let data = req.body
    console.log(data);
    
    EmailService.sendEmail(data, (err, result) => {
      if (err) res.send(err);
      return res.status(200).json(result);
    });
  })

};