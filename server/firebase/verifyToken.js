const { UNAUTHORIZED, INTERNAL_SERVER_ERROR, FORBIDDEN } = require('http-codes');
const firebaseAdmin = require('./admin');

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        const { uid } = decodedToken;
        req.userUid = uid;
        next();
      })
      .catch(({ code, message }) => {
        if (code === 'auth/argument-error') {
          res.status(UNAUTHORIZED).json({
            error: true,
            message: 'You are not authorized to perform this operation!'
          });
        } else {
          res.status(INTERNAL_SERVER_ERROR).json({
            error: true,
            message
          });
        }
      });
  } else {
    res.status(FORBIDDEN).json({
      error: true,
      message: 'No token provided'
    });
  }
};
