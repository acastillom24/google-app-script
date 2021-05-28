// Calcula el primer día de cada mes.
function PRIMER_DIA_MES(rango) {
  return Array.isArray(rango)
    ? rango.map(el1 => el1.map(el2 => new Date((el2.getMonth() + 1) + "/01/" + el2.getFullYear())))
    : new Date((rango.getMonth() + 1) + "/01/" + rango.getFullYear())
}
