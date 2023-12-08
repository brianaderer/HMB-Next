import {IncomingForm} from 'formidable';
import fs from 'fs';
import axios from 'axios';
import nextBase64 from 'next-base64';

export const config = {
    api: {
        bodyParser: false, // Turn off the default body parser
    }
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Parse the incoming form data
        const form = new IncomingForm();
        await form.parse(req, async (err, fields, files) => {
            const caption = fields.caption[0];
            const file = files.file[0];
            if (err) {
                return res.status(500).json({success: false, error: err.message});
            }

            try {
                const wpApiUrl = 'http://localhost:10005/wp-json/wp/v2/media';

                // Read the file into a buffer
                const fileBuffer = fs.readFileSync(file.filepath);
                const date = new Date();

                // Make the request to WordPress
                const response = await axios.post(wpApiUrl, fileBuffer, {
                    headers: {
                        'Content-Type': files.file.mimetype,
                        'Content-Disposition': `attachment; filename="${file.originalFilename}"`,
                        'Authorization': 'Basic ' + nextBase64.encode('rest-uploader:' + process.env.REST_API_APPLICATION_PASSWORD),
                    },
                    params: {
                        description: 'Uploaded from the HMB Marina Guest Contact form on ' + date,
                        alt_text: file.originalFilename,
                        caption: caption,
                    }
                });

                res.status(200).json({success: true, data: response.data});
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({success: false, error: error.message});
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
