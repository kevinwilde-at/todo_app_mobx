# todo_app_mobx

Airtable block using MobX with decorators, TypeScript, and custom bundler.

```
npm i mobx mobx-react
npm i --save-dev @airtable/blocks-webpack-bundler @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

Update frontend/tsconfig.json
```diff
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es2018",
        "sourceMap": true,
        "allowSyntheticDefaultImports": true,
+        "experimentalDecorators": true,
+        "useDefineForClassFields": true,
        "jsx": "react"
    },
    "exclude": ["node_modules"]
}

```

Create bundler.js with
```js
const createBundler = require('@airtable/blocks-webpack-bundler').default;

function createConfig(baseConfig) {
    baseConfig.module.rules.push({
        test: /\.tsx$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
            babelrc: false,
            configFile: false,
            presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-typescript'),
            ],
            "plugins": [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": false }]
                // In contrast to MobX 4/5, "loose" must be false!    ^
            ]
        },
    });
    return baseConfig;
}

exports.default = () => {
    return createBundler(createConfig);
};
```

Update block.json 
```diff
{
    "version": "1.0",
-    "frontendEntry": "./frontend/index.tsx"
+    "frontendEntry": "./frontend/index.tsx",
+    "bundler": {
+        "module": "./bundler.js"
+    }
}

```

block run as usual!