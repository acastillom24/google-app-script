/**
 * Girar datos horizontales en un rango vertical
 * 
 * @param {range} range Rango de datos a girar
 * @return Devuelve los datos en forma vertical
 * @customfunction
 */

function girarDatos(range){
  var datos = range.reduce((acc, el) => acc.concat(el), []);
  var datos = datos.map(el => [el]);
  return datos;
}
