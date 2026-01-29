/**
 * 提交数据持久化：Vercel 部署时用 Blob，本地无 token 时用内存
 */
const BLOB_PATH = 'data/submissions.json';

let memoryStore = []; // 本地开发无 BLOB_READ_WRITE_TOKEN 时使用

async function getSubmissions() {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return memoryStore;
    }
    try {
        const { list } = await import('@vercel/blob');
        const { blobs } = await list({ prefix: 'data/' });
        const blob = blobs.find((b) => b.pathname === BLOB_PATH);
        if (!blob || !blob.url) return [];
        const res = await fetch(blob.url);
        const text = await res.text();
        if (!text.trim()) return [];
        return JSON.parse(text);
    } catch (e) {
        console.error('getSubmissions error:', e);
        return [];
    }
}

async function saveSubmissions(submissions) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        memoryStore = submissions;
        return;
    }
    const { put } = await import('@vercel/blob');
    await put(BLOB_PATH, JSON.stringify(submissions, null, 2), {
        access: 'public',
        contentType: 'application/json',
    });
}

module.exports = { getSubmissions, saveSubmissions };
