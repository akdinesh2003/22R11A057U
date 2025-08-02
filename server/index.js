const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const moment = require('moment');
const { Log } = require('../logging-middleware');

const app = express();
const PORT = 5000;

const urls = {};
const clicks = {};

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await Log('backend', 'info', 'middleware', `${req.method} ${req.path} - IP: ${req.ip || 'Unknown'}`);
  } catch (error) {
    console.error('Logging middleware error:', error.message);
  }
  next();
});

const TERMS = `
TERMS AND CONDITIONS FOR URL SHORTENER SERVICE

1. ACCEPTANCE OF TERMS
   By using this URL shortener service, you agree to these terms and conditions.

2. SERVICE DESCRIPTION
   This service allows you to create shortened URLs that redirect to original URLs.

3. USER RESPONSIBILITIES
   - You must not create links to illegal or harmful content
   - You must not spam or abuse the service
   - You are responsible for the content of your shortened URLs

4. SERVICE LIMITATIONS
   - URLs expire after 30 minutes by default
   - We do not guarantee 100% uptime
   - We may delete URLs that violate our terms

5. PRIVACY
   - We collect basic usage data (IP, user agent, referrer)
   - We do not sell your data to third parties
   - Data is stored temporarily and may be deleted

6. DISCLAIMER
   This service is provided "as is" without any warranties.
   We are not responsible for any damages or losses.

7. CHANGES TO TERMS
   We may update these terms at any time.
   Continued use means you accept the new terms.

8. CONTACT
   For questions about these terms, contact the service administrator.
`;

app.get('/terms', async (req, res) => {
  try {
    await Log('backend', 'info', 'route', 'Terms and conditions requested');
    res.json({ terms: TERMS });
  } catch (error) {
    console.error('Error in terms route:', error.message);
    res.json({ terms: TERMS });
  }
});

app.get('/health', async (req, res) => {
  try {
    await Log('backend', 'info', 'route', 'Health check requested');
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error in health route:', error.message);
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  }
});

app.post('/shorturls', async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;
    
    await Log('backend', 'info', 'handler', `Creating short URL request received`);
    
    if (!url) {
      await Log('backend', 'error', 'handler', 'URL is required but not provided');
      return res.status(400).json({ error: 'URL is required' });
    }
    
    try {
      new URL(url);
    } catch (error) {
      await Log('backend', 'error', 'handler', `Invalid URL format provided`);
      return res.status(400).json({ error: 'Invalid URL format' });
    }
    
    if (validity && (validity <= 0 || validity > 1440)) {
      await Log('backend', 'error', 'handler', `Invalid validity provided`);
      return res.status(400).json({ error: 'Validity must be between 1 and 1440 minutes' });
    }
    
    let finalShortcode = shortcode;
    
    if (shortcode) {
      if (urls[shortcode]) {
        await Log('backend', 'warn', 'handler', `Shortcode already exists`);
        return res.status(409).json({ error: 'Shortcode already exists' });
      }
    } else {
      do {
        finalShortcode = nanoid(8);
      } while (urls[finalShortcode]);
    }
    
    const expiry = moment().add(validity, 'minutes').toISOString();
    
    urls[finalShortcode] = {
      originalUrl: url,
      createdAt: new Date().toISOString(),
      expiry: expiry
    };
    
    clicks[finalShortcode] = [];
    
    await Log('backend', 'info', 'service', `Short URL created successfully`);
    
    res.status(201).json({
      shortLink: `http://localhost:5000/${finalShortcode}`,
      expiry: expiry
    });
    
  } catch (error) {
    await Log('backend', 'error', 'handler', `Error creating short URL`);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/shorturls/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    
    await Log('backend', 'info', 'handler', `Statistics requested`);
    
    if (!urls[shortcode]) {
      await Log('backend', 'warn', 'handler', `URL not found`);
      return res.status(404).json({ error: 'URL not found' });
    }
    
    const urlData = urls[shortcode];
    const clickData = clicks[shortcode] || [];
    
    await Log('backend', 'info', 'service', `Statistics retrieved`);
    
    res.json({
      shortcode: shortcode,
      originalUrl: urlData.originalUrl,
      shortLink: `http://localhost:5000/${shortcode}`,
      createdAt: urlData.createdAt,
      expiry: urlData.expiry,
      totalClicks: clickData.length,
      clickDetails: clickData
    });
    
  } catch (error) {
    await Log('backend', 'error', 'handler', `Error getting URL stats`);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    
    await Log('backend', 'info', 'handler', `Redirect requested`);
    
    if (!urls[shortcode]) {
      await Log('backend', 'warn', 'handler', `URL not found`);
      return res.status(404).json({ error: 'URL not found' });
    }
    
    const urlData = urls[shortcode];
    
    if (moment().isAfter(urlData.expiry)) {
      await Log('backend', 'warn', 'handler', `URL expired`);
      return res.status(410).json({ error: 'URL has expired' });
    }
    
    const clickInfo = {
      timestamp: new Date().toISOString(),
      referrer: req.get('Referrer') || 'Direct',
      userAgent: req.get('User-Agent') || 'Unknown',
      ip: req.ip || 'Unknown'
    };
    
    clicks[shortcode].push(clickInfo);
    
    await Log('backend', 'info', 'service', `Redirect successful`);
    
    res.redirect(urlData.originalUrl);
    
  } catch (error) {
    await Log('backend', 'error', 'handler', `Error redirecting`);
    res.status(500).json({ error: 'Server error' });
  }
});

const startServer = async () => {
  try {
    await Log('backend', 'info', 'config', 'Server starting up');
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Terms: http://localhost:${PORT}/terms`);
    });
    
    await Log('backend', 'info', 'config', `Server started successfully`);
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

module.exports = { app, startServer }; 