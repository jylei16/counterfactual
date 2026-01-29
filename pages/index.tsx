import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';

const DEFAULT_DOMAINS = [
  '经典力学',
  '电磁学',
  '光学',
  '热力学',
  '天体物理',
  '化学',
  '生物',
  '地理',
  '社会学',
];

export default function Home() {
  const [domains, setDomains] = useState<string[]>(DEFAULT_DOMAINS);
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [newDomain, setNewDomain] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [worldKnowledge, setWorldKnowledge] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 加载已有领域
  useEffect(() => {
    fetch('/api/domains')
      .then(res => res.json())
      .then(result => {
        if (result.domains && result.domains.length > 0) {
          const allDomains = [...new Set([...DEFAULT_DOMAINS, ...result.domains])];
          setDomains(allDomains);
        }
      })
      .catch(err => console.error('Error loading domains:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setMessage({ type: 'error', text: '请输入用户名' });
      return;
    }

    const domainToUse = selectedDomain || newDomain.trim();
    if (!domainToUse) {
      setMessage({ type: 'error', text: '请选择或输入领域' });
      return;
    }

    if (!worldKnowledge.trim()) {
      setMessage({ type: 'error', text: '请输入考察的基本世界知识' });
      return;
    }

    if (!data.trim()) {
      setMessage({ type: 'error', text: '请输入数据' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          domain: domainToUse,
          worldKnowledge: worldKnowledge.trim(),
          data: data.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: '提交成功！' });
        // 清空表单
        setWorldKnowledge('');
        setData('');
        // 如果是新领域，添加到列表
        if (newDomain.trim() && !domains.includes(newDomain.trim())) {
          setDomains([...domains, newDomain.trim()]);
        }
        setNewDomain('');
        setSelectedDomain('');
      } else {
        setMessage({ type: 'error', text: result.error || '提交失败，请重试' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误，请重试' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>反事实数据收集平台</title>
        <meta name="description" content="多人协作数据提交平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>反事实数据收集平台</h1>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username">用户名 *</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入您的用户名"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="domain">领域 *</label>
              <select
                id="domain"
                value={selectedDomain}
                onChange={(e) => {
                  setSelectedDomain(e.target.value);
                  setNewDomain('');
                }}
                className={styles.select}
              >
                <option value="">请选择领域（或下方输入新领域）</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newDomain">或新建领域</label>
              <input
                type="text"
                id="newDomain"
                value={newDomain}
                onChange={(e) => {
                  setNewDomain(e.target.value);
                  setSelectedDomain('');
                }}
                placeholder="输入新领域名称"
                disabled={!!selectedDomain}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="worldKnowledge">考察的基本世界知识 *</label>
              <textarea
                id="worldKnowledge"
                value={worldKnowledge}
                onChange={(e) => setWorldKnowledge(e.target.value)}
                placeholder="请输入考察的基本世界知识"
                rows={4}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="data">由这个世界知识得到的数据 *</label>
              <textarea
                id="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="请输入数据"
                rows={6}
                required
              />
            </div>

            {message && (
              <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                {message.text}
              </div>
            )}

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? '提交中...' : '提交数据'}
            </button>
          </form>

          <div className={styles.linkContainer}>
            <a href="/view" className={styles.viewLink}>查看提交数据 →</a>
          </div>
        </div>
      </main>
    </>
  );
}
