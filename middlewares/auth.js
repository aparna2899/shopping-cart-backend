var jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

module.exports = {
  verifyToken: async (req, res, next) => {
    var token = req.headers.authorization;
    try {
      if (token) {
        var payload = await jwt.verify(token, secret);
        req.user = payload;
        return next();
      } else {
        res.status(400).json({ error: 'Authorization required!' });
      }
    } catch (error) {
      next(error);
    }
  },
};
