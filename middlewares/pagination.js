function pagination(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = 10;

    try {
      if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await model
          .countDocuments({ userID: req.user.id })
          .exec();

        const result = { total };
        if (endIndex < total) {
          result.next = {
            page: page + 1,
            limit: limit
          };
        }

        if (startIndex > 0) {
          result.previous = {
            page: page - 1,
            limit: limit
          };
        }

        result.urls = await model
          .find({ userID: req.user.id })
          .limit(limit)
          .skip(startIndex)
          .select('-meta -userID -__v')
          .sort({ createdAt: -1 });

        res.result = result;
        return next();
      } else {
        const urls = await model
          .find({ userID: req.user.id })
          .select('-meta -userID -__v')
          .sort({ createdAt: -1 });
        res.result = { total: urls.length, urls };
        return next();
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  };
}

module.exports = pagination;
