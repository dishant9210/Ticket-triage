import { useState } from 'react';


const API = import.meta.env.VITE_API_URL;

export default function TicketForm({ onResult }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (message.trim().length < 5) {
      setError('Please enter at least 5 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/tickets/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Try again.');
      onResult(data);
      setMessage('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Submit a Support Ticket</h2>
      <textarea
        style={styles.textarea}
        rows={5}
        placeholder="Describe your issue in detail..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        disabled={loading}
        maxLength={2000}
      />
      <div style={styles.meta}>
        <span style={styles.charCount}>{message.length}/2000</span>
        {error && <span style={styles.error}>{error}</span>}
      </div>
      <button
        style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Ticket →'}
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    marginBottom: '24px'
  },
  heading: { margin: '0 0 16px', fontSize: '18px', color: '#1a1a2e' },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1.5px solid #e0e0e0',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  meta: { display: 'flex', justifyContent: 'space-between', margin: '8px 0 12px' },
  charCount: { fontSize: '12px', color: '#999' },
  error: { fontSize: '13px', color: '#e53e3e', fontWeight: 500 },
  button: {
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s'
  }
};