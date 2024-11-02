
import Excel from 'xlsx';
import _ from 'lodash';

export class SpreadsheetService {
    static async readWorkbook(path: string) {
        const excel = Excel.readFile(path);
        return Object.entries(excel.Sheets).map(([sheetName, sheet]) => {
            return {
                sheetName,
                sheet: _.omitBy(sheet, (k) => k.startsWith('!')),
            }
        });
    }
}