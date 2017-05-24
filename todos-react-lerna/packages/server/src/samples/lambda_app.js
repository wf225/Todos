/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = global["handler"] = __webpack_require__(6);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(15);
var bodyParser = __webpack_require__(12);
var cors = __webpack_require__(14);
var compression = __webpack_require__(13);
var http = __webpack_require__(16);
var path = __webpack_require__(17);
var awsServerlessExpressMiddleware = __webpack_require__(7);
var app = express();

app.use(function (req, res, next) {
  // res.set('Accept', 'application/json');
  res.set('Content-Type', 'application/json');
  // res.set('Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Access-Control-Allow-Origin', '*');
  return next();
});

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (true) {
  app.use(awsServerlessExpressMiddleware.eventContext()); // AWS serverless
  __webpack_require__(3)(app); // routes  
  module.exports = app; // Export your express server so you can import it in the lambda function.
}
// dev env
else {
    // NODE server
    // 1. set port.
    var port = 8001;
    app.set('port', port);

    // 2. set the static files location: ./public/index.html
    app.use(express.static(path.join(__dirname, '../../vertical')));

    // 3. set routes
    require('./routes.js')(app);

    // 4. strat listen
    app.listen(port, function () {
      console.log("Server listening on port %s", port);
    });

    // OR:
    // const server = http.createServer(app);
    // const hostname = '127.0.0.1';
    // server.listen(port, hostname, () => {
    //   console.log("Server listening on port %s", port);
    // });
  }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app) {

  __webpack_require__(5)(app);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(0);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AWS = __webpack_require__(10);

AWS.config.update({
    region: "us-east-1"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "Todos";

function TodosService() {}

//
TodosService.createTable = function () {
    var params = {
        TableName: tableName,
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }, //Partition key
        { AttributeName: "title", KeyType: "RANGE" } //Sort key
        ],
        AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }, { AttributeName: "title", AttributeType: "S" }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };

    dynamodb.createTable(params, function (err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", (0, _stringify2.default)(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", (0, _stringify2.default)(data, null, 2));
        }
    });
};

//
TodosService.getAll = function (callback) {
    var params = {
        TableName: tableName
    };

    // console.log("Scanning table.");
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", (0, _stringify2.default)(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            return callback(err, data.Items);
        }
    });
};

//
TodosService.add = function (item, callback) {
    // To improve the user experience, execute the callback first.
    // callback(null, item);

    var params = {
        TableName: tableName,
        Item: {
            "id": item.id,
            "title": item.title,
            "isCompleted": item.isCompleted,
            "status": item.status,
            "seconds": item.seconds
        }
    };

    // console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", (0, _stringify2.default)(err, null, 2));
            return callback(err);
        } else {
            // console.log("Added item:", item);
            return callback(err, item);
        }
    });
};

//
TodosService.remove = function (id, title, callback) {
    // callback(null, JSON.stringify({ id: id }));

    var params = {
        TableName: tableName,
        Key: {
            "id": id,
            "title": title
        }
    };

    // console.log("Attempting a conditional delete...");
    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", (0, _stringify2.default)(err, null, 2));
            return callback(err);
        } else {
            // console.log("DeleteItem succeeded:", data);
            return callback(err, { id: id, title: title });
        }
    });
};

//
TodosService.update = function (item, callback) {
    // callback(null, JSON.stringify(item));

    var params = {
        TableName: tableName,
        Key: {
            "id": item.id,
            "title": item.title
        },
        UpdateExpression: "set isCompleted = :isCompleted, #st=:status, seconds=:seconds",
        ExpressionAttributeNames: {
            "#st": "status"
        },
        ExpressionAttributeValues: {
            ":isCompleted": item.isCompleted,
            ":status": item.status,
            ":seconds": item.seconds
        },
        ReturnValues: "UPDATED_NEW"
    };

    // console.log("Updating the item...");
    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", (0, _stringify2.default)(err, null, 2));
            return callback(err);
        } else {
            // console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            return callback(err, item);
        }
    });
};

//
TodosService.toggleAll = function (isCompleted, callback) {
    callback(null, (0, _stringify2.default)({ isCompleted: isCompleted }));

    var params = {
        TableName: tableName
    };

    console.log("Scanning table.");
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", (0, _stringify2.default)(err, null, 2));
            return callback(err);
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function (todo) {
                if (todo.isCompleted != isCompleted) {
                    todo.isCompleted = isCompleted;
                    TodosService.update(todo, function (err, data) {});
                }
            });

            // return callback(err, JSON.stringify({ isCompleted }));
        }
    });
};

//
TodosService.removeCompleted = function (callback) {
    callback(null, (0, _stringify2.default)({}));

    var params = {
        TableName: tableName
    };

    // console.log("Scanning table.");
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", (0, _stringify2.default)(err, null, 2));
            return callback(err);
        } else {
            // console.log("Scan succeeded.");
            data.Items.forEach(function (todo) {
                if (todo.isCompleted) {
                    TodosService.remove(todo.id, todo.title, function (err, data) {});
                }
            });

            // return callback(err, JSON.stringify({}));
        }
    });
};

module.exports = TodosService;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(0);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let Todos = require("./TodosJson");
var Todos = __webpack_require__(4);

module.exports = function (app) {

  // RESTful api --------------------------------------------------------------
  // app.get('/', (req, res) => {
  //   res.render('index', {
  //     apiUrl: req.apiGateway ? `https://${req.apiGateway.event.headers.Host}/${req.apiGateway.event.requestContext.stage}` : 'http://localhost:3000'
  //   })
  // })

  var hello = {
    message: 'Hello World!',
    time: new Date().toLocaleString()
  };

  app.get('/', function (req, res) {
    res.json(req.apiGateway.event);
  });

  app.get('/api/test1', function (req, res) {
    hello.time = new Date().toLocaleString();
    return res.send(hello);
  });

  app.get('/api/test2', function (req, res) {
    hello.time = new Date().toLocaleString();
    return res.status(200).send((0, _stringify2.default)(hello));
  });

  app.get('/api/test3', function (req, res) {
    hello.time = new Date().toLocaleString();
    return res.status(200).json(hello);
  });

  app.get('/api/test4', function (req, res) {
    hello.time = new Date().toLocaleString();
    return res.status(200).json((0, _stringify2.default)(hello));
  });

  app.get('/api/test5', function (req, res) {
    res.status(201).end((0, _stringify2.default)(hello));
  });

  // get all todos
  app.get('/api/todos', function (req, res) {
    Todos.getAll(function (err, result) {
      if (err) res.send(err);
      return res.status(200).json(result);
    });
  });

  // create a todo
  app.post('/api/todo', function (req, res) {
    var item = req.body;
    // console.log(req.body);
    // return res.send(200, item);

    Todos.add(item, function (err, result) {
      if (err) {
        return res.status(400).send({ message: "Add todo failed: " + err.message });
      }
      // console.log(result);
      return res.status(200).send(result);
    });
  });

  // delete a todo
  app.delete('/api/todo/:id/:title', function (req, res) {
    var id = req.params.id;
    var title = req.params.title;
    console.log(title);
    // return res.send(200, {result: "OK"});

    Todos.remove(id, title, function (err, result) {
      if (err) {
        return res.status(400).send({ message: "Delete todo failed: " + err });
      }
      // console.log(result);
      return res.status(200).send(result);
    });
  });

  // update a todo
  app.put('/api/todo/:id', function (req, res) {
    var id = req.params.id;
    var todo = req.body;
    Todos.update(todo, function (err, result) {
      if (err) {
        return res.status(400).send({ message: "Update todo failed: " + err });
      }
      return res.status(200).send(result);
    });
  });

  // toggle all todos
  app.patch('/api/todos', function (req, res) {
    var isCompleted = req.body.isCompleted;
    Todos.toggleAll(isCompleted, function (err, result) {
      if (err) {
        return res.status(400).send({ message: "Toggle all todo failed: " + err });
      }
      return res.status(200).send(result);
    });
  });

  // delete all completed todos
  app.delete('/api/todos', function (req, res) {
    Todos.removeCompleted(function (err, result) {
      if (err) {
        return res.status(400).send({ message: "Remove completed all todo failed: " + err });
      }
      return res.status(200).send(result);
    });
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var awsServerlessExpress = __webpack_require__(11);
var app = __webpack_require__(2);

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes, and to the x-amazon-apigateway-binary-media-types array in
// simple-proxy-api.yaml, then redeploy (`npm run package-deploy`)
var binaryMimeTypes = ['application/octet-stream', 'font/eot', 'font/opentype', 'font/otf', 'image/jpeg', 'image/png', 'image/svg+xml'];

var server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
var handler = function handler(event, context) {
  return awsServerlessExpress.proxy(server, event, context);
};
module.exports = handler;

// // Test code
// exports.handler = function (event, context, callback) {
//   var name = "World";
//   var responseCode = 200;
//   console.log("request: " + JSON.stringify(event));
//   var responseBody = {
//     message: "Hello " + name + "!",
//     input: event
//   };
//   var response = {
//     statusCode: responseCode,
//     headers: {
//       // "Accept": "application/json",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
//       "Access-Control-Allow-Methods": "*",
//       "Access-Control-Allow-Origin": "*"
//     },
//     body: responseBody // JSON.stringify(responseBody)
//   };
//   console.log("response: " + response)
//   callback(null, response);
// };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports.eventContext = options => (req, res, next) => {
    options = options || {} // defaults: {reqPropKey: 'apiGateway', deleteHeaders: true}
    const reqPropKey = options.reqPropKey || 'apiGateway'
    const deleteHeaders = options.deleteHeaders === undefined ? true : options.deleteHeaders

    if (!req.headers['x-apigateway-event'] || !req.headers['x-apigateway-context']) {
        console.error('Missing x-apigateway-event or x-apigateway-context header(s)')
        next()
        return
    }

    req[reqPropKey] = {
        event: JSON.parse(decodeURIComponent(req.headers['x-apigateway-event'])),
        context: JSON.parse(decodeURIComponent(req.headers['x-apigateway-context']))
    }

    if (deleteHeaders) {
        delete req.headers['x-apigateway-event']
        delete req.headers['x-apigateway-context']
    }

    next()
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(9)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("aws-serverless-express");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);