import faker from "faker";

const mount = (element) => {
  let products = "";

  for (let i = 0; i < 5; i++) {
    // obtengo un nombre falso de producto
    const name = faker.commerce.productName();
    products += `<div>${name}</div>`;
  }

  element.innerHTML = products;
};

/**
 * Hay dos situaciones que se pueden dar
 * 1 - que estemos usando la app por separado, para probar y demas
 *     eso nos dice que vamos a usar el index.html de la app en si,
 * 2 - que este renderizandose la app dentro de un container,
 *     lo cual hace que no usemos el index.html de la app individual,
 *     se usa el del container, por ende pueden tener diferentes ids
 *     clases o lo que fuese
 * 
 * Por ende se tiene que solucionar como renderizar la informacion 
 * dependiendo de donde este siendo ejecutada la app
 * 
 * caso 1: vamos a interpretar que si tengo N elementos con IDs que solo el equipo de 
 * esta app conoce, estamos ejecutando la app individualmente de forma aislada al resto
 */
if(process.env.NODE_ENV === 'development'){
  const el = document.querySelector('#dev-products');

  // asumiendo que eel container no tiene un elemento
  // con el id dev-products
  if(el){
    mount(el)
  }
}

/**
 * caso 2: exportamos la funcion para que se le pase el elemento que se desee
 */
export { mount };
