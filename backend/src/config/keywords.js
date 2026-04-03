module.exports = {
  categories: {
    Billing: [
      'invoice', 'charge', 'payment', 'refund', 'subscription',
      'bill', 'price', 'overcharged', 'receipt', 'transaction'
    ],
    Technical: [
      'bug', 'error', 'crash', 'broken', 'not working', 'outage',
      'down', 'slow', 'timeout', 'login', 'failed', 'issue', '500', '404'
    ],
    Account: [
      'password', 'account', 'locked', 'access', 'username',
      'sign in', 'cant login', 'profile', 'email change', 'two factor'
    ],
    'Feature Request': [
      'would love', 'can you add', 'feature', 'suggestion',
      'request', 'improve', 'wish', 'could you', 'please add'
    ]
  },

  urgencyTerms: [
    'urgent', 'asap', 'immediately', 'critical', 'emergency',
    'right now', 'down', 'outage', 'as soon as possible', 'now'
  ],

  severitySignals: {
    P0: ['outage', 'down', 'critical', 'emergency', 'data loss', 'breach', 'security'],
    P1: ['urgent', 'asap', 'broken', 'crash', 'error', 'immediately', 'failed'],
    P2: ['slow', 'bug', 'not working', 'refund', 'wrong charge', 'issue'],
    P3: ['question', 'suggestion', 'feature', 'wondering', 'how do i', 'would love']
  },


  securityTerms: [
    'breach', 'hacked', 'hack', 'unauthorized', 'compromised',
    'security', 'stolen', 'vulnerability', 'phishing', 'malware', 'ransomware'
  ]
};