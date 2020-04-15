

const path = require("path");

module.exports = {
    entry: {
        main:"./src/main.ts"
    },

    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/env", "@babel/preset-typescript"],
                        plugins: [
                            "@babel/plugin-transform-async-to-generator",
                            "@babel/plugin-proposal-object-rest-spread", 
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-optional-chaining"
                        ]
                    }
                }
            }
            ]
      },
      resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
      },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
    }
}
 