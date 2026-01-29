// 使用 Vercel KV 或者简单的内存存储
let fieldsData = ['经典力学','化学', '生物', '社会学'];

module.exports = async (req, res) => {
    // 设置 CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        return res.status(200).json({ fields: fieldsData });
    }

    if (req.method === 'POST') {
        const { field } = req.body;
        
        if (field && !fieldsData.includes(field)) {
            fieldsData.push(field);
        }
        
        return res.status(200).json({ success: true, fields: fieldsData });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
