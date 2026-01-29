// 临时存储（重启后会丢失）
let submissions = [];

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { username, field, knowledge, derivedData } = req.body;
        
        const submission = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            username,
            field,
            knowledge,
            derivedData,
            timestamp: new Date().toISOString()
        };
        
        submissions.push(submission);
        
        return res.status(200).json({ success: true, submission });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
