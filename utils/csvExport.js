import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import fs from "fs";

export async function exportToCSV(data) {
    const dir = "exports";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const fileName = `data-${Date.now()}.csv`;
    const filePath = path.join(dir, fileName);

    const header = Object.keys(data[0]).map((key) => ({ id: key, title: key }));

    const csvWriter = createObjectCsvWriter({
        path: filePath,
        header,
        append: false,
    });

    await csvWriter.writeRecords(data);
    return filePath;
}



