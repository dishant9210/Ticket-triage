const {
  categories,
  urgencyTerms,
  severitySignals,
  securityTerms
} = require('../config/keywords');

function classify(message) {
  const lower = message.toLowerCase();

 
  const securityMatches = securityTerms.filter(t => lower.includes(t));
  const isSecurityThreat = securityMatches.length > 0;

  
  const scores = {};
  for (const [cat, terms] of Object.entries(categories)) {
    scores[cat] = terms.filter(t => lower.includes(t)).length;
  }
  scores['Other'] = 0;

  const sortedCategories = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sortedCategories[0][1];
  const category = topScore === 0 ? 'Other' : sortedCategories[0][0];

  
  const allTerms = Object.values(categories).flat();
  const keywords = [...new Set(allTerms.filter(t => lower.includes(t)))];

  const urgencyMatches = urgencyTerms.filter(t => lower.includes(t));
  const isUrgent = urgencyMatches.length > 0 || isSecurityThreat;

  let priority = 'P3';
  if (isSecurityThreat) {
    priority = 'P0';
  } else {
    for (const [p, terms] of Object.entries(severitySignals)) {
      if (terms.some(t => lower.includes(t))) {
        priority = p;
        break;
      }
    }
  }

  
  const signals = [...new Set([...urgencyMatches, ...securityMatches])];

 
  const matchCount = keywords.length + urgencyMatches.length + securityMatches.length;
  const confidence = parseFloat(Math.min(matchCount / 5, 1).toFixed(2));

  return {
    category: isSecurityThreat && category === 'Other' ? 'Technical' : category,
    priority,
    isUrgent,
    keywords,
    signals,
    confidence,
    securityFlag: isSecurityThreat
  };
}

module.exports = { classify };