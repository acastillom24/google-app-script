/**
 * Devuelve el número de elementos en un rango
 * 
 * @param {range} range Rango de datos a contar
 * @param {min} min Intervalo inferior
 * @param {max} max Intervalo superior
 * @return Devuelve el número de coincidencias
 * @customfunction
 */

function contarElemtosIntervalos(range, min, max) {
  var rango = range.filter(el => el >= min && el < max)
  return rango.length
}
