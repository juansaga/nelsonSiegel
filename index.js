// Instalas xlsx (npm i xlsx)

const XLSX = require('xlsx');

function leerExcel(ruta) {
    const workbook = XLSX.readFile(ruta);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    return dataExcel;
}

const betas = leerExcel('betas.xlsx');

let b0 = parseFloat((betas[0]['beta0']).replace(',','.'));
let b1 = parseFloat((betas[0]['beta1']).replace(',','.'));
let b2 = parseFloat((betas[0]['beta2']).replace(',','.'));

function nelsonSiegel(t) {
    return (b0 + b1 * (1 - Math.exp(-t / 3.7)) / (t / 3.7) + b2 * ((1 - Math.exp(-t / 3.7)) / (t / 3.7) - Math.exp(-t / 3.7))).toFixed(4)
}
// La ultima linea evalua la regresion de nelson siegel en un parametro t (tiempo en años)
console.log(nelsonSiegel(5))