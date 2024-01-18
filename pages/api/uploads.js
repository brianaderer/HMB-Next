import {IncomingForm} from 'formidable';
import fs from 'fs';
import axios from 'axios';
import nextBase64 from 'next-base64';
import {ApolloClient, gql, HttpLink, InMemoryCache} from "@apollo/client";
import fetch from "cross-fetch";

export const config = {
    api: {
        bodyParser: false, // Turn off the default body parser
    }
};

const UPDATE_IMAGE_META = gql`
    mutation updateImageMeta(
    $image_uuid: String = "", 
    $media_id: Int, 
    $uploaded_by: String = "") 
    {
    createMediaMeta(
    input: {
    imageMeta: 
    {
    image_uuid: 
    $image_uuid, 
    uploaded_by: 
    $uploaded_by
    }, 
    media_id: $media_id
    }
  ) {
    success
  }
}`;
console.log(process.env.NEXT_PUBLIC_WORDPRESS_URL);
const client = new ApolloClient({
    link: new HttpLink({ uri: process.env.NEXT_PUBLIC_WORDPRESS_URL + '/' + process.env.GRAPHQL_ENDPOINT , fetch }),
    cache: new InMemoryCache(),
});

export default async function handler(req, res) {

    if (req.method === 'POST') {

        // Parse the incoming form data
        const form = new IncomingForm();
        await form.parse(req, async (err, fields, files) => {
            const caption = fields.caption[0];
            const file = files.file[0];
            const uuid = fields.uuid[0];
            const uploaded_by = fields.uploaded_by[0];


            if (err) {
                return res.status(500).json({success: false, error: err.message});
            }

            try {
                const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL + '/wp-json/wp/v2/media';

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
                const variables = {
                    uploaded_by: uploaded_by,
                    image_uuid: uuid,
                    media_id: response.data.id,
                };
                // Execute GraphQL Mutation
                const apiResponse = await client.mutate({
                    mutation: UPDATE_IMAGE_META,
                    variables: variables
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
