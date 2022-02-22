import {} from 'dotenv/config';
import JWT from 'jsonwebtoken';

const secret = process.env.SECRET_TOKEN;
const {verify} = JWT;

const authorize =  (req,res, next) => {
  console.log('Authorize');

  const { authorization: givenToken } = req.headers;

  // Check if Token is given, if not, return 401
  if (!givenToken) {
    throw new Error('auth header required');
  }
  
  // Get the auth token
  const tokenToVerify = givenToken.split(' ');

  // Check that token is in proper format
  if (tokenToVerify[0] !== 'Token' || tokenToVerify[1] === null || tokenToVerify === 'undefined') {
    throw new Error('Invalid token');
  }

  verify(tokenToVerify[1], secret, (err, token) => {
    if (err) {
      console.error('[AUTH_MIDDLEWARE] Error verifying token : ', err);
      console.log('errrr', err.message);
      next(err);
      return;
    }
    console.log('User token : ', token);
    // Set user details in request context for next middleware to have access to if required
    if (req.method == 'PUT') {
      res.locals.token = givenToken;
    }
    res.locals.id = token.id;
    res.locals.name = token.name;
    res.locals.password = token.password;
  })    
  next();
}

export default authorize;