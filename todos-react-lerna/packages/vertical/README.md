# TODO List with Javascript

## Setup
```
npm init
npm install --save react react-dom
npm install --save classnames
npm install --save redux react-redux
npm install --save redux-saga
npm install --save react-slot-fill

npm install --save-dev babel-loader babel-core webpack
npm install --save-dev babel-preset-env babel-preset-react
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-cli

npm install --save babel-runtime
npm install --save-dev babel-plugin-transform-runtime

npm install --save-dev css-loader style-loader
npm install --save-dev jest babel-jest react-test-renderer
npm install --save-dev enzyme react-addons-test-utils
npm install --save-dev sinon
npm install --save-dev babel-plugin-transform-object-rest-spread
npm install --save-dev reselect
npm install --save-dev babel-polyfill
npm install --save-dev source-map-loader
npm install --save-dev babel-eslint
```

## Lerna
```
npm install --global lerna
lerna init

lerna clean --yes
lerna bootstrap --yes

lerna run build
lerna publish --skip-git --skip-npm
```

## [Weback Dll](https://github.com/chenchunyong/webpack-dllPlugin)
```
webpack --config webpack.dll.config.js
```

## Node Server
```
npm install --save express
npm install --save body-parser
npm install --save isomorphic-fetch
```

### (pm2)[https://github.com/Unitech/pm2]
PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

```
npm install pm2 -g
pm2 start app.js
```


## TODO
```
npm install --save react-router
npm install webpack-dev-server -g

es6-promise
```