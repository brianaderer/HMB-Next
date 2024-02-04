import {Client} from "@googlemaps/google-maps-services-js";
import fs, {promises as fsPromises} from "fs";
import path from "path";
export default async function handler(req, res) {
    const {start, finish, mode = 'driving', id} = req.body || {};
    try {
        const client = new Client({});
        // Assuming 'data' is at the root of your project, and your current file is in 'pages/api'
        const filePath = path.join(process.cwd(), 'data', 'locations.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        let locations = JSON.parse(fileContents);
        if( !locations[id]?.[mode] ){
            client
                .distancematrix({
                    params: {
                        origins: [start],
                        destinations: [finish],
                        units: 'imperial',
                        mode: [mode],
                        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
                    },
                    timeout: 1000, // milliseconds
                })
                .then(async (r) => {
                    locations[id] = {};
                    locations[id][mode] = r.data.rows[0].elements;
                    await fsPromises.writeFile(filePath, JSON.stringify(locations, null, 2), 'utf8');
                    return res.status(200).json({ error: "", data: r.data.rows[0].elements });
                })
                .catch((e) => {
                    if (e.response && e.response.data && e.response.data.error_message) {
                        console.log(e.response.data.error_message);
                    } else if (e.response && e.response.data) {
                        console.log('Error:', e.response.data); // Generic error logging
                    } else if (e.response) {
                        console.log('Error:', e.response); // If the data object is not present
                    } else {
                        console.log('Error:', e.message); // Fallback to generic error message
                    }
                });
        } else {
            return res.status(200).json({ error: "", data: locations[id][mode] });
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}