import { useState } from 'react';
import TicketForm from './components/TicketForm';
import ResultPanel from './components/ResultPanel';
import TicketTable from './components/TicketTable';

export default function App() {
  const [result, setResult] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleResult = (data) => {
    setResult(data);
    setRefreshKey(k => k + 1); // triggers TicketTable to re-fetch
  };

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <h1 style={styles.logo}> Ticket Triage AI</h1>
          <span style={styles.tag}>Local NLP · No External APIs</span>
        </div>
      </header>

      <main style={styles.main}>
        <TicketForm onResult={handleResult} />
        {result && <ResultPanel result={result} />}
        <TicketTable refresh={refreshKey} />
      </main>
    </div>
  );
}

const styles = {
  root: { minHeight: '100vh', background: '#f0f2f8', fontFamily: 'system-ui, sans-serif' },
  header: { background: '#1a1a2e', padding: '0 24px' },
  headerInner: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px'
  },
  logo: { color: '#fff', fontSize: '20px', fontWeight: 700, margin: 0 },
  tag: {
    background: 'rgba(255,255,255,0.1)',
    color: '#a5b4fc',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 500
  },
  main: { maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }
};