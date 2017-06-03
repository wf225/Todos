
module.exports = function (app) {

  // RESTful api --------------------------------------------------------------
  // app.get('/api/', (req, res) => {
  //   res.render('index', {
  //     apiUrl: req.apiGateway ? `https://${req.apiGateway.event.headers.Host}/${req.apiGateway.event.requestContext.stage}` : 'http://localhost:3000'
  //   })
  // })

  let hello = (index = -1) => ({
    message: 'Hello World!',
    index: index,
    time: new Date().toLocaleString()
  });

  app.get('/api/test/0', (req, res) => {
    res.json(req.apiGateway.event);
  })

  app.get('/api/test/1', function (req, res) {
    return res.send(hello(1));
  });

  app.get('/api/test/2', function (req, res) {
    return res.status(200).send(JSON.stringify(hello(2)));
  });

  app.get('/api/test/3', function (req, res) {
    return res.status(200).json(hello(3));
  });

  app.get('/api/test/4', function (req, res) {
    return res.status(200).json(JSON.stringify(hello(4)));
  });

  app.get('/api/test/5', function (req, res) {
    res.status(201).end(JSON.stringify(hello(5)));
  });

  app.get('/api/test/:id/name/:name', (req, res) => {
    let id = req.params.id;
    let name = req.params.name;
    // res.json({ id, name });
    res.json(req.apiGateway.event);
  })

};