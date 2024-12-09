export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { secret, path } = req.body;

    // Validate secret
    if (secret !== process.env.REVALIDATION_SECRET) {
        return res.status(401).json({ message: 'Invalid secret' });
    }

    try {
        // Revalidate the specified path
        await res.revalidate(path);
        return res.json({ revalidated: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error revalidating' });
    }
}
