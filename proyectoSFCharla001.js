function onOpen() {
  var sss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [];
  menuEntries.push({name: "Creates New Spreadsheets", functionName: "crearSpreadsheets"});
  menuEntries.push(null); // line separator
  menuEntries.push({name: "Copy Codes", functionName: "copyCodes"});

  sss.addMenu("Data Analysis v02", menuEntries);
}

// Variabes Globales
var ss = SpreadsheetApp.getActive();
var sheet = ss.getSheetByName('Proveedores');
var sheet2 = ss.getSheetByName('Macros');
var folderId = '1-gvnm65Ha-_WpsLcqJtfqBQLR6hOQrjY';
var name = 'dataSet';
var i = 5;

function crearSpreadsheets() {

  var range = sheet.getRange('B5:B' + sheet.getLastRow()).getValues();
  var range = range.filter(el => el != '');

  range.map(el => crear(el));

}

function crear(name) {
  var resource = {
    title: name,
    mimeType: MimeType.GOOGLE_SHEETS,
    parents: [{ id: folderId }]
  }
  var fileJson = Drive.Files.insert(resource)
  var fileId = fileJson.id;
  var fileLink = fileJson.alternateLink;
  var fileExpLink = fileJson.exportLinks['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

  sheet.getRange('C' + i).setValue(fileId);
  crearNuevasHoja(fileId);

  sheet.getRange('E' + i).setValue(fileLink);
  sheet.getRange('F' + i).setValue(fileExpLink);

  i += 1;

}

// Cambiar el nombre de la primera hoja
function crearNuevasHoja(sheetID) {
  var ws = SpreadsheetApp.openById(sheetID);
  var s = ws.getSheets()[0];
  s.getRange('A1').setValue('codMat');
  s.getRange('B1').setValue('txtMat');
  s.getRange('C1').setValue('Tipo');
  s.getRange('D1').setValue('GC');
  s.getRange('E1').setValue('LT');
  s.getRange('F1').setValue('UMB');
  
  formatoDatos(s);

  s.setName(name);
  sheet.getRange('D' + i).setValue(s.getSheetName());
}

function formatoDatos(spreadsheet) {
  spreadsheet.getRange('A1:F1').activate();
  spreadsheet.getActiveRangeList().setBackground('#cfe2f3')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setFontSize(12);
  spreadsheet.getRange('A1').activate();
};

function copyCodes() {

  //Actualizar la lista de cod de cada proveedor
  var dataOrigen = sheet2.getRange('A2:I' + sheet2.getLastRow()).getValues(); // Data de los códigos de materiales
  // Depurar la data Origen
  var dataOrigenDep = dataOrigen.filter(el => el[0] != ''); //Filtramos los datos diferentes de vacío

  //Arrays de los Nombres & ID de los proveedores
  var dataProvID = sheet.getRange('A5:C' + sheet.getLastRow()).getValues();
  var dataProvID = dataProvID.filter(el => el[0] != '');

  for (i = 0; i < dataProvID.length; i++) {
    var idProv = dataProvID[i][0];
    var idDestino = dataProvID[i][2];

    var dataOrigenDepF = dataOrigenDep.filter(el => el[7] === idProv); //Filtrar los datos por id del cod del Prov

    actualizarListaCodV02(dataOrigenDepF, idDestino, name);
  }
}


function actualizarListaCodV02(dataOrigenDepF, idDestino, nameSheetDestino) {

  var dataOrigenDepF = dataOrigenDepF.map(el => [].concat(el.slice(0, 6))); // Depuramos una vez mas la dataOrigenDep

  // Trabajando en la hoja de Destino
  var libroDestino = SpreadsheetApp.openById(idDestino);
  var hojaDestino = libroDestino.getSheetByName(nameSheetDestino);
  hojaDestino.getRange('A2:F' + (dataOrigenDepF.length + 1)).setValues(dataOrigenDepF);

}
