/**
 * Esto se hace porque al tener que importar faker en el index.js,
 * al ser compartido entre frontends hijos, el padre se encarga de la importar la libreria de terceros
 * pero al ser asincrono, este localhost que contiene esta app se va a romper por querer usar algo que
 * no esta importado
 * 
 * el error de consola que nos hace darnos cuenta de esto es 
 * Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/faker/faker
 * 
 * para eso pase todo a bootstrap.js y aca uso el import asincrono (lo q lo hace async son los () desp del import)
 */

import("./bootstrap");
