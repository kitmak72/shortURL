const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortID = require('shortid');
const ShortUrl = require('../models/shortUrl');
const {
  ensureAuthenticated,
  retrieveUserFromToken
} = require('../middlewares/auth');

//create new URL
//POST /api/url/
router.post('/', retrieveUserFromToken, async (req, res) => {
  const { origin } = req.body;
  const userID = req.user.id;
  const urlCode = req.body.urlCode || shortID.generate();
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(origin)) {
    return res.status(400).json({ success: false, message: 'invalid URL' });
  }

  try {
    if (!userID) {
      let url = await ShortUrl.findOne({ origin });
      if (!url) {
        const short = baseUrl + '/' + urlCode;

        url = new ShortUrl({
          urlCode,
          origin,
          short
        });

        await url.save();
      }

      res.json({ success: true, url });
    } else {
      let url = await ShortUrl.findOne({ urlCode });
      if (url) {
        res
          .status(409)
          .json({ success: false, message: 'This URL ending already exists' });
      } else {
        const short = baseUrl + '/' + urlCode;

        url = new ShortUrl({
          userID,
          urlCode,
          origin,
          short
        });

        await url.save();
        res.json({ success: true, url });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

//delete URL
//DELETE /api/url/code
router.delete('/:urlCode', ensureAuthenticated, (req, res) => {
  const { urlCode } = req.params;
  ShortUrl.findOneAndDelete({ urlCode }, (err, url) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }

    if (!url) {
      res.status(404).json({ success: false, message: `${urlCode} not found` });
    } else {
      res.json({ success: true, url });
    }
  });
});

module.exports = router;
