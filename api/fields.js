// 固定的领域列表
const FIELDS = [
    '经典力学',
    '电磁学',
    '光学',
    '热力学',
    '天体物理',
    '化学',
    '生物',
    '地理',
    '社会学'
];

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        return res.status(200).json({ fields: FIELDS });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
