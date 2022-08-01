// Instalar puppeter y esceljs (npm instal puppeteer exceljs)

const puppeteer = require("puppeteer")
const ExcelJS = require('exceljs')

const saveExcel = (data) => {
    const workbook = new ExcelJS.Workbook()
    const fileName = 'betas.xlsx'
    const sheet = workbook.addWorksheet('betas')

    const reColumns = [
        { header: 'beta0', key: 'beta0' },
        { header: 'beta1', key: 'beta1' },
        { header: 'beta2', key: 'beta2' }
    ]
    sheet.columns = reColumns

    sheet.addRows(data)

    workbook.xlsx.writeFile(fileName).then((e) => {

    })

}

const init = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://totoro.banrep.gov.co/analytics/saw.dll?Go&Action=prompt&NQUser=publico&NQPassword=publico123&path=%2Fshared%2FSeries%20Estad%C3%ADsticas_T%2F1.%20Tasas%20TES%2F1.2%20Betas%20TES%2F1.2.1%20Betas%20TES%20pesos&Options=rfd&lang=es")
    await page.waitForSelector('.ViewTable')
    /* Run javascript inside the page */
    const data = await page.evaluate(() => {
        const items = document.querySelectorAll("td.OORT")
        const lista = []
        for (let i = 0; i < 3; i++) {
            lista.push(items[i].innerHTML)
        }
        return lista
    })
    let row = [
        {
            beta0: data[0],
            beta1: data[1],
            beta2: data[2]
        }
    ]
    await browser.close()
    saveExcel(row)
}

init()