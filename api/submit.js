const { getSubmissions, saveSubmissions } = require('../lib/storage');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { username, field, knowledge, derivedData } = req.body || {};

        if (!username || !field || !knowledge || !derivedData) {
            return res.status(400).json({ error: '请填写：用户名、领域、基本世界知识、得到的数据' });
        }

        const submission = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 11),
            username: String(username).trim(),
            field: String(field).trim(),
            knowledge: String(knowledge).trim(),
            derivedData: String(derivedData).trim(),
            timestamp: new Date().toISOString(),
        };

        try {
            const submissions = await getSubmissions();
            submissions.push(submission);
            await saveSubmissions(submissions);
            return res.status(200).json({ success: true, submission });
        } catch (err) {
            console.error('submit error:', err);
            return res.status(500).json({ error: '保存失败，请稍后重试' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
