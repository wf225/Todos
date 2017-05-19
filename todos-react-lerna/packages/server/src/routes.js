
module.exports = function (app) {
  
  require('./todos/routes.js')(app);
  require('./apitest/routes.js')(app);

};