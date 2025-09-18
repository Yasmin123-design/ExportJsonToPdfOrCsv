import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import fs from "fs";

export async function exportToCSV(data) {
    const dir = "exports";
    if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    }

    const filePath = path.join(dir, "data.csv");

    const fileExists = fs.existsSync(filePath);
    const fileNotEmpty = fileExists && fs.statSync(filePath).size > 0;

    let header;

    if (!fileExists) {
    header = Object.keys(data[0]).map((key) => ({ id: key, title: key }));
    } else {
    const firstLine = fs.readFileSync(filePath, "utf8").split("\n")[0];
    const existingHeader = firstLine.split(",");
    header = existingHeader.map((key) => ({ id: key, title: key }));
    }

    const csvWriter = createObjectCsvWriter({
    path: filePath,
    header,
    append: fileNotEmpty, 
    });

    await csvWriter.writeRecords(data);
    return filePath;
}


