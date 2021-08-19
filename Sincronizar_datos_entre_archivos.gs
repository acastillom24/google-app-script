/*
Script tomado del blog: Iñaki Huerta
Link: t.ly/bsMM
*/

function launchPredefinedImports()
{
  var importRanges = [
    { 
      destinySheetName : "Importacion_1", 
      fromFileKey : "[TuKey]",
      fromSheet : "[Nombre Hoja Exacto]",
      fromRange : "A:E"
    },
  ];
    
  launchImportsByArray( importRanges );
}

function launchImportsByArray( importRanges )
{
  
  for (var i=0;i<importRanges.length;i++) {
    importExternalData(importRanges[i].destinySheetName,importRanges[i].fromFileKey,importRanges[i].fromSheet,importRanges[i].fromRange);
  }
  
}

function importExternalData(destinySheetName,fromFileKey,fromSheet,fromRange)
{
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(destinySheetName);
  if (sheet == null )
  {
    ss.insertSheet(destinySheetName);
    sheet = ss.getSheetByName(destinySheetName);
  }
  
  var data = SpreadsheetApp.openById(fromFileKey).getSheetByName(fromSheet).getRange(fromRange).getValues();
  sheet.clearContents();
  sheet.getRange("A1").setValue("Imported Data");
  sheet.getRange("A2").setValue("File:");
  sheet.getRange("B2").setValue(fromFileKey);
  sheet.getRange("A3").setValue("Sheet:");
  sheet.getRange("B3").setValue(fromSheet);
  sheet.getRange("A4").setValue("Range:");
  sheet.getRange("B4").setValue(fromRange);
  sheet.getRange("A6").setValue("-----");
  if ( data[0] ) {
    sheet.getRange(8, 1, data.length, data[0].length).setValues( data );
  }
}
