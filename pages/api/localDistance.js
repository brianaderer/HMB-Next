import { Client } from "@googlemaps/google-maps-services-js";
import { promises as fsPromises } from "fs";
import path from "path";

export default async function handler(req, res) {
    const { id } = req.body || {};

    try {
        const client = new Client({});
        return {};
    //     const filePath = path.join(process.cwd(), 'data', 'locations.json');
    //
    //     // Read and parse the locations file
    //     let locations = {};
    //     try {
    //         const fileContents = await fsPromises.readFile(filePath, 'utf8');
    //         locations = JSON.parse(fileContents);
    //         return res.status(200).json({ error: null, data: locations});
    //     } catch (e) {
    //         console.log('Failed to read or parse locations file, defaulting to empty object.', e);
    //     }
    // } catch (error) {
    //     // Catch-all error handling
    //     console.error('Unexpected error:', error);
    //     return res.status(500).json({ error: error.message });
    // }
}
