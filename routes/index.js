const express = require('express');
const router = express.Router();
const userAgent = require('express-useragent');
const geoIP = require('geoip-lite');
const ShortUrl = require('../models/shortUrl');

//access with short URL
//GET /urlCode
router.get('/:code', userAgent.express(), async (req, res) => {
  try {
    const url = await ShortUrl.findOne({ urlCode: req.params.code });
    if (url) {
      if (url.userID != 'guest') {
        const geo = geoIP.lookup(req.ip);
        const meta = {
          region: geo == null ? 'unknown' : geo.city + '-' + geo.country,
          platform: req.useragent.browser,
          accessedAt: new Date()
        };

        url.clicks++;
        url.meta.unshift(meta);
        await url.save();
      }

      res.redirect(url.origin);
    } else {
      //@Todo:    redirect to 404 page
      res
        .status(404)
        .send(
          `<h1> Page not found </h1><h3>${req.originalUrl} could not be found.</h3>`
        );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
