const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ShortUrl = require('../models/shortUrl');
const processMeta = require('../middlewares/processMetaData');
const pagination = require('../middlewares/pagination');
const { ensureAuthenticated } = require('../middlewares/auth');

//get user profile
//GET /user/profile
router.get('/profile', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

//get user's url data
//GET /user/url
router.get('/url', ensureAuthenticated, pagination(ShortUrl), (req, res) => {
  res.json(res.result);
});

//get meta data of URL
//GET /user/url/meta/urlCode
router.get(
  '/url/meta/:urlCode',
  ensureAuthenticated,
  processMeta,
  (req, res) => {
    const { meta } = req;
    res.json({ success: true, meta });
  }
);

module.exports = router;
