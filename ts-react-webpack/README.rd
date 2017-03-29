# [TypeScript with React & Webpack](https://www.tslang.cn/docs/handbook/react-&-webpack.html)
The project structure:
```
proj/
├─ dist/
└─ src/
   └─ components/
```

Init the project:
```
npm init
npm install -g webpack
```

Install react
```
npm install --save react react-dom @types/react @types/react-dom
npm install --save-dev typescript awesome-typescript-loader source-map-loader
```

[Install redux](http://cn.redux.js.org/index.html)
```
npm install --save redux
npm install --save react-redux
npm install --save-dev redux-devtools
```

[tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html):
```
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

## [ts-loader](https://github.com/TypeStrong/ts-loader)

## [Webpack](http://webpack.github.io/docs/configuration.html)
Webpack compress
```
webpack -p --config webpack.config.js
```