const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

// 初始数据
const INITIAL_DATA = {
    submissions: [],
    fields: ['物理', '化学', '生物', '经济学']
};

// 确保数据文件存在
async function ensureDataFile() {
    try {
        // 检查 data 目录是否存在
        try {
            await fs.access(DATA_DIR);
        } catch {
            console.log('创建 data 目录...');
            await fs.mkdir(DATA_DIR, { recursive: true });
        }

        // 检查数据文件是否存在
        try {
            await fs.access(DATA_FILE);
            console.log('数据文件已存在');
            
            // 验证文件内容
            const content = await fs.readFile(DATA_FILE, 'utf8');
            const data = JSON.parse(content);
            
            // 确保必要的字段存在
            if (!data.submissions) data.submissions = [];
            if (!data.fields) data.fields = INITIAL_DATA.fields;
            
            await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
        } catch (error) {
            console.log('创建初始数据文件...');
            await fs.writeFile(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2));
        }
        
        console.log('✅ 数据文件准备完成:', DATA_FILE);
    } catch (error) {
        console.error('❌ 初始化数据文件失败:', error);
        throw error;
    }
}

// 读取所有数据
async function readData() {
    try {
        const content = await fs.readFile(DATA_FILE, 'utf8');
        const data = JSON.parse(content);
        
        // 确保数据结构完整
        if (!data.submissions) data.submissions = [];
        if (!data.fields) data.fields = INITIAL_DATA.fields;
        
        return data;
    } catch (error) {
        console.error('读取数据失败:', error);
        // 如果读取失败，返回初始数据
        return { ...INITIAL_DATA };
    }
}

// 写入数据
async function writeData(data) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('写入数据失败:', error);
        throw error;
    }
}

// 获取所有领域
app.get('/api/fields', async (req, res) => {
    try {
        const data = await readData();
        console.log('返回领域列表:', data.fields);
        res.json({ fields: data.fields || [] });
    } catch (error) {
        console.error('获取领域失败:', error);
        res.status(500).json({ 
            error: '读取领域失败',
            message: error.message 
        });
    }
});

// 添加新领域
app.post('/api/fields', async (req, res) => {
    try {
        const { field } = req.body;
        
        if (!field || !field.trim()) {
            return res.status(400).json({ error: '领域名称不能为空' });
        }
        
        const data = await readData();
        
        if (!data.fields.includes(field.trim())) {
            data.fields.push(field.trim());
            await writeData(data);
            console.log('添加新领域:', field.trim());
        }
        
        res.json({ success: true, fields: data.fields });
    } catch (error) {
        console.error('添加领域失败:', error);
        res.status(500).json({ 
            error: '添加领域失败',
            message: error.message 
        });
    }
});

// 提交数据
app.post('/api/submit', async (req, res) => {
    try {
        const { username, field, knowledge, derivedData } = req.body;
        
        // 验证必填字段
        if (!username || !field || !knowledge || !derivedData) {
            return res.status(400).json({ error: '所有字段都是必填的' });
        }
        
        const submission = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            username: username.trim(),
            field: field.trim(),
            knowledge: knowledge.trim(),
            derivedData: derivedData.trim(),
            timestamp: new Date().toISOString()
        };
        
        const data = await readData();
        data.submissions.push(submission);
        await writeData(data);
        
        console.log('新提交:', submission.username, '-', submission.field);
        res.json({ success: true, submission });
    } catch (error) {
        console.error('提交失败:', error);
        res.status(500).json({ 
            error: '提交失败',
            message: error.message 
        });
    }
});

// 获取所有提交
app.get('/api/submissions', async (req, res) => {
    try {
        const data = await readData();
        console.log('返回提交记录数:', data.submissions.length);
        res.json({ submissions: data.submissions || [] });
    } catch (error) {
        console.error('读取提交失败:', error);
        res.status(500).json({ 
            error: '读取数据失败',
            message: error.message 
        });
    }
});

// 按用户查询提交
app.get('/api/submissions/:username', async (req, res) => {
    try {
        const data = await readData();
        const userSubmissions = data.submissions.filter(
            s => s.username === req.params.username
        );
        console.log('查询用户:', req.params.username, '找到', userSubmissions.length, '条');
        res.json({ submissions: userSubmissions });
    } catch (error) {
        console.error('查询失败:', error);
        res.status(500).json({ 
            error: '查询失败',
            message: error.message 
        });
    }
});

// 删除提交
app.delete('/api/submissions/:id', async (req, res) => {
    try {
        const data = await readData();
        const originalLength = data.submissions.length;
        data.submissions = data.submissions.filter(s => s.id !== req.params.id);
        
        if (data.submissions.length < originalLength) {
            await writeData(data);
            console.log('删除记录:', req.params.id);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: '记录不存在' });
        }
    } catch (error) {
        console.error('删除失败:', error);
        res.status(500).json({ 
            error: '删除失败',
            message: error.message 
        });
    }
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await ensureDataFile();
        
        app.listen(PORT, () => {
            console.log('=================================');
            console.log('✅ 服务器启动成功！');
            console.log(`🌐 访问地址: http://localhost:${PORT}`);
            console.log(`📁 数据文件: ${DATA_FILE}`);
            console.log('=================================');
        });
    } catch (error) {
        console.error('❌ 服务器启动失败:', error);
        process.exit(1);
    }
}

startServer();
