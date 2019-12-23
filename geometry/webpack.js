const path = require("path");

module.exports = {
    entry: {
        main:"./src/main.ts"
    },

    module: {
        rules: [
          {
            test: /\.ts?$/,
            loader: ['babel-loader', 'ts-loader'],
            exclude: /node_modules/,
            
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
 