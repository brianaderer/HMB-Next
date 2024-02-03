import {Client} from "@googlemaps/google-maps-services-js";
export default async function handler(req, res) {
    const {start, finish, mode = 'driving'} = req.body || {};
    try {
        const client = new Client({});

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
            .then((r) => {
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
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}