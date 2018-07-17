const fs = require('fs');
const readXlsx = require('read_xlsx');
const excelBuffer = fs.readFileSync('./excel/2.xlsx');
// 返回Promise对象
readXlsx.getWorkbook(excelBuffer).then(function (workbook) {
    // 获得所有工作簿名称
    const sheetNames = workbook.getSheetNames();
    console.log(sheetNames);
    // 获得名称为Sheet1的工作簿
    workbook.getSheet('Sheet1').then(function (sheet) {
        // 获得总行数
        const rowLen = sheet.getRows();
        // 获得总列数
        const cellLen = sheet.getColumns();
        // 遍历所有单元格
        for (let i = 0; i < rowLen; i++) {
            for (let k = 0; k < cellLen; k++) {
                const cell = sheet.getCell(i, k);
                // If the cell is empty, it is possible that the cell does not exist return null!
                if (cell !== null) {
                    // 打印单元格内容
                    console.log(cell.getName() + ':' + cell.getContents());
                }
            }
        }
        // find cell by name 通过名称获得某个单元格
        const a1Sheet = sheet.findCell('A1');
        const a1Str = a1Sheet.getContents();
        console.log(a1Str);
    })['catch'](function (err) {
        console.error(err.stack);
    });
});
