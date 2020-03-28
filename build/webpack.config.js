const { VueLoaderPlugin } = require("vue-loader");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path")

module.exports = {
    entry: {
        "index": "./src/app.vue"
    },
    resolve: {
        extensions: [".ts"]
    },
    output: {
        libraryTarget: 'commonjs',
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist')
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        preserveWhitespace: false,
                        loaders: {
                            css: "vue-style-loader!css-loader"
                        }
                    }
                }]
            },
            {
                test: /\.ts/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                },
                compress: {
                    drop_console: true,
                }
            }
        })]
    }
}