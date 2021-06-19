const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    // puerto de localhost
    port: 8081,
  },
  plugins: [
    // esto es lo que tiene q estar en cada front, permite hacer los microfrontends
    new ModuleFederationPlugin({
      name: "products",
      // este archivo puede llamarse como sea, pero como norma se le pone asi
      filename: "remoteEntry.js",
      // esto es un alias al js que exporto al modulo padre
      // para que se sepa que tipo de js es, que hace, y q no sean
      // puros index.js
      exposes: {
        "./ProductsIndex": "./src/index",
      },
      // shared contiene las dependencias / librerias q quiero compartir con otros front
      // el container va a notar esto, y no va a bajar dependencias nodemodules duplicadas, las comparte
      shared: ["faker"],
    }),
    new HtmlWebpackPlugin({
      // esto es para poder establecer un server local y renderizarlo en un dom
      template: "./public/index.html",
    }),
  ],
};
