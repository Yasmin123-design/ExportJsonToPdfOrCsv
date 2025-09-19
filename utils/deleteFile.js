import fs from "fs";
import path from "path";

export async function deleteFile(req, res) {
    try {
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).json({ message: "File name is required" });
    }

    const filePath = path.join(process.cwd(), "exportstopdf", fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(filePath);

    res.json({ message: "File deleted successfully" });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting file" });
    }
}
