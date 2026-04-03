import { useEffect, useState } from 'react';


const API = import.meta.env.VITE_API_URL;

const priorityBadge = {
  P0: { background: '#fed7d7', color: '#c53030' },
  P1: { background: '#feebc8', color: '#c05621' },
  P2: { background: '#fefcbf', color: '#975a16' },
  P3: { background: '#c6f6d5', color: '#276749' }
};

export default function TicketTable({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/tickets`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load tickets');
        return res.json();
      })
      .then(data => setTickets(data))
      .catch(() => setError('Failed to load tickets'))
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) return <p style={styles.msg}>Loading tickets...</p>;
  if (error) return <p style={{ ...styles.msg, color: '#e53e3e' }}>{error}</p>;
  if (tickets.length === 0) return <p style={styles.msg}>No tickets yet. Submit one above!</p>;

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Previous Tickets</h2>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['Time', 'Message', 'Category', 'Priority', 'Urgent', 'Confidence', 'Security'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id} style={styles.tr}>
                <td style={styles.td}>
                  {new Date(t.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                </td>
                <td style={{ ...styles.td, maxWidth: '220px' }}>
                  <span title={t.message} style={styles.truncate}>{t.message}</span>
                </td>
                <td style={styles.td}>{t.category}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...(priorityBadge[t.priority] || {}) }}>
                    {t.priority}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  {t.isUrgent ? '🔴' : '🟢'}
                </td>
                <td style={styles.td}>{Math.round(t.confidence * 100)}%</td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  {t.securityFlag ? '⚠️' : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
  },
  heading: { margin: '0 0 20px', fontSize: '18px', color: '#1a1a2e' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: {
    background: '#f7f8fc',
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: 700,
    color: '#666',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #e2e8f0'
  },
  tr: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '12px 14px', color: '#333', verticalAlign: 'middle' },
  badge: { borderRadius: '999px', padding: '3px 10px', fontWeight: 700, fontSize: '12px' },
  truncate: { display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  msg: { textAlign: 'center', color: '#999', padding: '32px' }
};