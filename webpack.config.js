const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    }
};