// 与 submit.js 共享数据（实际应该用数据库）
let submissions = [];

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { username, id } = req.query;

    if (req.method === 'GET') {
        if (username) {
            const userSubmissions = submissions.filter(s => s.username === username);
            return res.status(200).json({ submissions: userSubmissions });
        }
        
        return res.status(200).json({ submissions });
    }

    if (req.method === 'DELETE' && id) {
        submissions = submissions.filter(s => s.id !== id);
        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
