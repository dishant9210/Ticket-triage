const express = require('express');
const router = express.Router();
const { analyze, list } = require('../controllers/ticketController');

router.post('/analyze', analyze);
router.get('/', list);

module.exports = router;