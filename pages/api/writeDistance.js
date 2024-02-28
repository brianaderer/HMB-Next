
import { promises as fsPromises } from "fs";
import path from "path";

export default async function handler(req, res) {
    const { distances } = req.body || {};
    return {};
    //
    // try {
    //     const filePath = path.join(process.cwd(), 'data', 'locations.json');
    //     try {
    //         const success = await fsPromises.writeFile(filePath, JSON.stringify(distances, null, 2), 'utf8');
    //         return res.status(200).json({ error: null, data: success});
    //     } catch (e) {
    //         console.log('Failed to read or parse locations file, defaulting to empty object.', e);
    //     }
    // } catch (error) {
    //     // Catch-all error handling
    //     console.error('Unexpected error:', error);
    //     return res.status(500).json({ error: error.message });
    // }
}
