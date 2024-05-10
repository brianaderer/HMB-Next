// pages/api/readFiles.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const directoryPath = path.join(process.cwd(), 'public', 'assets');

    fs.readdir(directoryPath, (error, files) => {
        if (error) {
            res.status(500).json({ error: "Failed to read directory" });
        } else {
            res.status(200).json({ files });
        }
    });
}
