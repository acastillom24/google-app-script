// La función onOpen se ejecuta al abrir la hoja
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [];
  menuEntries.push({name: "Menu Entry 1", functionName: "function1"});
  menuEntries.push(null); // line separator
  menuEntries.push({name: "Menu Entry 2", functionName: "function2"});

  ss.addMenu("addMenuExample", menuEntries);
}
