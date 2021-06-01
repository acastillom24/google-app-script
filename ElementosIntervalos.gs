/**
 * Devuelve el número de elementos en un rango
 * 
 * @param {numero 1} range Rango de datos a contar
 * @param {numero 2} min Intervalo inferior
 * @param {numero 3} max Intervalo superior
 * @return Devuelve el número de coincidencias
 * @customfunction
 */

function contarElemtosIntervalos(range, min, max) {
  var rango = range.filter(el => el >= min && el < max)
  return rango.length
}
