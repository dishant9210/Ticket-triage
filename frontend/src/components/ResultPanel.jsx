const priorityColors = {
  P0: { bg: '#fff5f5', border: '#fc8181', text: '#c53030' },
  P1: { bg: '#fffaf0', border: '#f6ad55', text: '#c05621' },
  P2: { bg: '#fffff0', border: '#ecc94b', text: '#975a16' },
  P3: { bg: '#f0fff4', border: '#68d391', text: '#276749' }
};

export default function ResultPanel({ result }) {
  if (!result) return null;

  const pc = priorityColors[result.priority] || priorityColors['P3'];
  const confidencePct = Math.round(result.confidence * 100);

  return (
    <div style={styles.card}>
      {result.securityFlag && (
        <div style={styles.securityBanner}>
          ⚠️ SECURITY THREAT DETECTED — Escalated to P0 for immediate review
        </div>
      )}

      <h2 style={styles.heading}>Analysis Result</h2>

      <div style={styles.grid}>
        {/* Category */}
        <div style={styles.stat}>
          <span style={styles.label}>Category</span>
          <span style={styles.value}>{result.category}</span>
        </div>

        {/* Priority */}
        <div style={{ ...styles.stat, background: pc.bg, border: `1.5px solid ${pc.border}` }}>
          <span style={styles.label}>Priority</span>
          <span style={{ ...styles.value, color: pc.text }}>{result.priority}</span>
        </div>

        {/* Urgency */}
        <div style={styles.stat}>
          <span style={styles.label}>Urgency</span>
          <span style={{ ...styles.value, color: result.isUrgent ? '#e53e3e' : '#38a169' }}>
            {result.isUrgent ? '🔴 Urgent' : '🟢 Normal'}
          </span>
        </div>

        {/* Confidence */}
        <div style={styles.stat}>
          <span style={styles.label}>Confidence</span>
          <div style={styles.barBg}>
            <div style={{ ...styles.barFill, width: `${confidencePct}%` }} />
          </div>
          <span style={styles.confPct}>{confidencePct}%</span>
        </div>
      </div>

      {/* Signals */}
      {result.signals?.length > 0 && (
        <div style={styles.section}>
          <span style={styles.label}>Signals Detected</span>
          <div style={styles.chips}>
            {result.signals.map(s => (
              <span key={s} style={{ ...styles.chip, background: '#fed7d7', color: '#c53030' }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      {result.keywords?.length > 0 && (
        <div style={styles.section}>
          <span style={styles.label}>Keywords Extracted</span>
          <div style={styles.chips}>
            {result.keywords.map(k => (
              <span key={k} style={styles.chip}>{k}</span>
            ))}
          </div>
        </div>
      )}
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
  securityBanner: {
    background: '#c53030',
    color: '#fff',
    borderRadius: '8px',
    padding: '12px 16px',
    fontWeight: 700,
    fontSize: '14px',
    marginBottom: '20px',
    letterSpacing: '0.3px'
  },
  heading: { margin: '0 0 20px', fontSize: '18px', color: '#1a1a2e' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' },
  stat: {
    background: '#f7f8fc',
    borderRadius: '8px',
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: { fontSize: '11px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' },
  value: { fontSize: '20px', fontWeight: 700, color: '#1a1a2e' },
  barBg: { background: '#e2e8f0', borderRadius: '999px', height: '8px', overflow: 'hidden', marginTop: '4px' },
  barFill: { background: '#4f46e5', height: '100%', borderRadius: '999px', transition: 'width 0.5s ease' },
  confPct: { fontSize: '13px', color: '#666', fontWeight: 600 },
  section: { marginTop: '16px' },
  chips: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' },
  chip: { background: '#eef2ff', color: '#4338ca', borderRadius: '999px', padding: '4px 12px', fontSize: '12px', fontWeight: 500 }
};