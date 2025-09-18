import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const exportToPDF = async (data) => {
    if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Data must be a non-empty array");
    }

    const dir = path.join(process.cwd(), "exportstopdf");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `data.pdf`);
    const doc = new PDFDocument({ margin: 30 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const headers = Object.keys(data[0]);
    const colWidth = 150;
    const rowHeight = 20;
    let y = 50;

    headers.forEach((header, i) => {
    doc
      .rect(50 + i * colWidth, y, colWidth, rowHeight)
        .fillAndStroke("#cccccc", "#000") 
    doc
        .fillColor("#000")
        .font("Helvetica-Bold")
        .fontSize(12)
      .text(header, 55 + i * colWidth, y + 5, { width: colWidth - 10, align: "left" });
    });

    y += rowHeight;

    data.forEach((row) => {
    headers.forEach((h, i) => {
        doc
        .rect(50 + i * colWidth, y, colWidth, rowHeight)
        .stroke()
        doc
        .fillColor("#000")
        .font("Helvetica")
        .fontSize(10)
        .text(row[h] ?? "", 55 + i * colWidth, y + 5, { width: colWidth - 10, align: "left" });
    });
    y += rowHeight;
    });

    doc.end();

    return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", (err) => reject(err));
    });
};


