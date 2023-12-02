export default async function handler(req, res) {
    try {
        const { body } = req; // Extract the body from the request
        console.log(body);
        return res.status(200).json({ body }); // Return only the body
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}
