function listarArchivos() {

  // Ingresamos el ID de la carpeta
  var ui1 = SpreadsheetApp.getUi();
  var idCarpeta = ui1.prompt("Ingrese el ID de la carpeta a listar: ", ui1.ButtonSet.OK_CANCEL);

  if (idCarpeta.getSelectedButton() == ui1.Button.OK) {

    // Ingresamos el tipo de mimeType
    var ui2 = SpreadsheetApp.getUi();
    var tipoArchivo = ui2.prompt("Ingrese el tipo de MIMETYPE: ", ui2.ButtonSet.OK_CANCEL);

    if (tipoArchivo.getSelectedButton() == ui2.Button.OK) {
      var carpeta = DriveApp.getFolderById(idCarpeta.getResponseText());
      var listaArchivos = carpeta.searchFiles("mimeType = 'application/vnd.google-apps." + tipoArchivo.getResponseText() + "'");

      var ss = SpreadsheetApp.getActive();
      var ws = ss.getActiveSheet();

      var i = ws.getCurrentCell().getRow();
      var j = ws.getCurrentCell().getColumn();

      while (listaArchivos.hasNext()) {
        var archivo = listaArchivos.next();
        ws.getRange(i, j).setValue(archivo.getName());
        ws.getRange(i, j + 1).setValue(archivo.getId());
        ws.getRange(i, j + 2).setValue(archivo.getUrl());
        i += 1;
      }
    } else if (tipoArchivo.getSelectedButton() == ui2.Button.CANCEL) {
      // Se ejecuta cuando cancela
    } else if (tipoArchivo.getSelectedButton() == ui2.Button.CLOSE) {
      // Se ejecuta cuando cierra 
    } else {
      // En caso de no ejecutar las dos anteriores
    }

  } else if (idCarpeta.getSelectButton() == ui.Button.CANCEL) {
    // Se ejecuta cuando cancela
  } else if (idCarpeta.getSelectButton() == ui.Button.CLOSE) {
    // Se ejecuta cuando cierra 
  } else {
    // En caso de no ejecutar las dos anteriores
  }

}
