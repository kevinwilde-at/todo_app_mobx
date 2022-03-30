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