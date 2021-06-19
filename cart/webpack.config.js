const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    // puerto de localhost
    port: 8083,
  },
  plugins: [
    // esto es lo que tiene q estar en cada front, permite hacer los microfrontends
    new ModuleFederationPlugin({
      name: "cart",
      // este archivo puede llamarse como sea, pero como norma se le pone asi
      filename: "remoteEntry.js",
      // esto es un alias al js que exporto al modulo padre
      // para que se sepa que tipo de js es, que hace, y q no sean
      // puros index.js
      exposes: {
        "./CartShow": "./src/bootstrap",
      },
      // shared contiene las dependencias / librerias q quiero compartir con otros front
      // el container va a notar esto, y no va a bajar dependencias nodemodules duplicadas, las comparte
      // si un proyecto tiene una version diferente de faker, webpack baja 2 versiones de nodemodules
      // shared: ["faker"], ATENCION: si lo dejamos asi, y usamos por ej ReactJS, si ejecutamos multiples React
      // puede salir un error de que ya tenemos muchos modulos de react corriendo, por eso hay q hacerlo de esta forma
      // y esto nos va a mandar un error en consola de que nosotros queremos una sola copia de las dependencias
      // pero estamos usando (por ej) diferentes versiones en cada app independiente, queda a gusto del programador
      // si quiere usar dos copias diferentes o una sola y que todos se ajusten a la misma
      // shared: {
      //   faker: {
      //     singleton: true,
      //   },
      // },
      shared: ["faker"],
    }),
    new HtmlWebpackPlugin({
      // esto es para poder establecer un server local y renderizarlo en un dom
      template: "./public/index.html",
    }),
  ],
};
