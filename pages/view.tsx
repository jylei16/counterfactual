import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/View.module.css';

interface Submission {
  id: string;
  username: string;
  domain: string;
  worldKnowledge: string;
  data: string;
  timestamp: string;
}

export default function View() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [domains, setDomains] = useState<string[]>([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchUsername, selectedDomain]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions');
      const result = await response.json();
      if (result.submissions) {
        setSubmissions(result.submissions);
        // 提取所有领域
        const allDomains = [...new Set(result.submissions.map((s: Submission) => s.domain))];
        setDomains(allDomains.sort());
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    if (searchUsername.trim()) {
      filtered = filtered.filter(s => 
        s.username.toLowerCase().includes(searchUsername.toLowerCase())
      );
    }

    if (selectedDomain) {
      filtered = filtered.filter(s => s.domain === selectedDomain);
    }

    // 按时间倒序排列
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    setFilteredSubmissions(filtered);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `submissions_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>查看提交数据</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.container}>
            <p>加载中...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>查看提交数据</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>查看提交数据</h1>

          <div className={styles.controls}>
            <div className={styles.searchGroup}>
              <label htmlFor="searchUsername">按用户名搜索：</label>
              <input
                type="text"
                id="searchUsername"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                placeholder="输入用户名"
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="filterDomain">按领域筛选：</label>
              <select
                id="filterDomain"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className={styles.select}
              >
                <option value="">全部领域</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>

            <button onClick={downloadJSON} className={styles.downloadButton}>
              下载所有数据 (JSON)
            </button>
          </div>

          <div className={styles.stats}>
            <p>总提交数: {submissions.length} | 显示: {filteredSubmissions.length}</p>
          </div>

          <div className={styles.submissionsList}>
            {filteredSubmissions.length === 0 ? (
              <p className={styles.noData}>暂无数据</p>
            ) : (
              filteredSubmissions.map(submission => (
                <div key={submission.id} className={styles.submissionCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.username}>{submission.username}</span>
                    <span className={styles.domain}>{submission.domain}</span>
                    <span className={styles.timestamp}>{formatDate(submission.timestamp)}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.field}>
                      <strong>考察的基本世界知识：</strong>
                      <p>{submission.worldKnowledge}</p>
                    </div>
                    <div className={styles.field}>
                      <strong>数据：</strong>
                      <p className={styles.dataContent}>{submission.data}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.backLink}>
            <a href="/">← 返回提交页面</a>
          </div>
        </div>
      </main>
    </>
  );
}
