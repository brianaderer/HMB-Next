export default async function handler(req, res) {
    try {
        let foo;
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: "" });
}
