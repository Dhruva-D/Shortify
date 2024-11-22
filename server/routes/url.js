const express = require('express')
const { handelGenerateNewShortURL, handelRedirectToURL, handelGetAnalytics } = require('../controllers/url')

const router = express.Router();

router.post('/', handelGenerateNewShortURL); 
router.get('/:shortID', handelRedirectToURL);
router.get('/analytics/:shortID', handelGetAnalytics)

module.exports = router; 