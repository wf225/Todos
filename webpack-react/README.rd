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
npm install --save react react-dom @types/react @types/react-dom
npm install --save-dev typescript awesome-typescript-loader source-map-loader
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