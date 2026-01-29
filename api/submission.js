const { getSubmissions, saveSubmissions } = require('../lib/storage');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { username, id } = req.query || {};

    try {
        const submissions = await getSubmissions();

        if (req.method === 'GET') {
            const list = username
                ? submissions.filter((s) => s.username === String(username).trim())
                : submissions;
            return res.status(200).json({ submissions: list });
        }

        if (req.method === 'DELETE' && id) {
            const next = submissions.filter((s) => s.id !== id);
            await saveSubmissions(next);
            return res.status(200).json({ success: true });
        }
    } catch (err) {
        console.error('submission error:', err);
        return res.status(500).json({ error: '操作失败' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
