import { Client } from "@googlemaps/google-maps-services-js";
import { promises as fsPromises } from "fs";
import path from "path";

export default async function handler(req, res) {
    const { start, finish, mode = 'driving', id } = req.body || {};

    try {
        const client = new Client({});
            try {
                // Perform the API call using async/await
                const response = await client.distancematrix({
                    params: {
                        origins: [start],
                        destinations: [finish],
                        units: 'imperial',
                        mode: mode,
                        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
                    },
                    timeout: 1000, // milliseconds
                });
                const distanceResponse = (response.data.rows[0].elements[0]);

                // Respond with the newly fetched data
                return res.status(200).json({ error: "", data: distanceResponse});
            } catch (error) {
                // Handle API call errors or file write errors
                console.error('Error during API call or file write:', error);
                return res.status(error.statusCode || 500).json({ error: error.message });
            }
    } catch (error) {
        // Catch-all error handling
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: error.message });
    }
}
