const { analyzeAndSave, getAll } = require('../services/ticketService');

exports.analyze = async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string')
    return res.status(400).json({ error: 'Message is required' });
  if (message.trim().length < 5)
    return res.status(400).json({ error: 'Message too short (min 5 characters)' });
  if (message.length > 2000)
    return res.status(400).json({ error: 'Message too long (max 2000 characters)' });
  try {
    const result = await analyzeAndSave(message.trim());
    return res.status(201).json(result);
  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Internal server error during analysis' });
  }
};

exports.list = async (_req, res) => {
  try {
    const tickets = await getAll();
    return res.json(tickets);
  } catch (err) {
    console.error('List error:', err);
    return res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};