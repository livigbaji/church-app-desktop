
import Excel from 'xlsx';

export class SpreadsheetService {
    static async readWorkbook(path: string) {
        const workbook = Excel.readFile(path);

        return workbook.SheetNames.reduce((acc, sheetName) => ({
            ...acc,
            [sheetName]: Excel.utils.sheet_to_json(workbook.Sheets[sheetName])
        }), {});
    }
}
