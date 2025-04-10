const path = require("path");

module.exports = {
  entry: "./src/index.js", // Asegúrate de que apunte al archivo de entrada correcto
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Para permitir la resolución de archivos .jsx
  },
  devServer: {
    contentBase: "./dist", // Si estás usando Webpack Dev Server
    hot: true,
  },
};
