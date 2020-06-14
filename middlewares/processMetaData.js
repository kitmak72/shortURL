const ShortURL = require('../models/shortUrl');

async function processMeta(req, res, next) {
  try {
    const { meta, origin } = await ShortURL.findOne({
      urlCode: req.params.urlCode
    })
      .select('meta')
      .select('origin');

    const date = new Date();
    const dateOfAccess = {};
    const region = {};
    const platform = {};
    let count = 0;

    meta.forEach(meta => {
      if (count < 30) {
        const date = meta.accessedAt.toISOString().split('T')[0];
        if (dateOfAccess[date] === undefined) {
          dateOfAccess[date] = 1;
          count++;
        } else {
          dateOfAccess[date]++;
        }
      }

      region[meta.region] === undefined
        ? (region[meta.region] = 1)
        : region[meta.region]++;

      platform[meta.platform] === undefined
        ? (platform[meta.platform] = 1)
        : platform[meta.platform]++;
    });

    req.meta = {
      dateOfAccess,
      region,
      platform,
      totalAccess: meta.length,
      origin
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
}

module.exports = processMeta;
