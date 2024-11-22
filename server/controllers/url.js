const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url')

const uid = new ShortUniqueId({length: 8});

async function handelGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    const uniqueId = uid.rnd();
    await URL.create({
      shortID: uniqueId,
      redirectURL: body.url,
      visitHistory: [],
    });

    res.json({ id: uniqueId });
  } catch (error) {
    console.error('Error generating URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function handelRedirectToURL(req, res) {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortID
    },
    { $push: {
        visitHistory: {
          timestamp: new Date(Date.now()).toLocaleString(),
        }
      }
    }
  );
  
  res.redirect(entry.redirectURL);
}

async function handelGetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID }).lean(); // Use lean() to improve query speed


  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handelGenerateNewShortURL,
  handelRedirectToURL,
  handelGetAnalytics
}