import { exportToCSV } from "../utils/csvExport.js";
import { exportToPDF } from "../utils/pdfExport.js";

export async function exportData(req, res) {
    try {
    const { data, format } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ message: "Invalid data format" });
    }

    let filePath;
    if (format === "csv") {
        filePath = await exportToCSV(data);
    } else if (format === "pdf") {
        filePath = await exportToPDF(data);
    } else {
        return res.status(400).json({ message: "Format must be csv or pdf" });
    }

    res.download(filePath);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error exporting file" });
    }
}
