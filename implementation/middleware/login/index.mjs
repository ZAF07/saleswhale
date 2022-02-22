import {} from 'dotenv/config';
import JWT from 'jsonwebtoken';

const {sign} = JWT;
const secret = process.env.SECRET_TOKEN;
const db = {
users: [
  {
    name: 'zaffere',
    password: '1234',
    token: 'ecr1234'
  },
],
};

const loginMiddleware = (req, res, next) => {
  console.log('Middleware login');

  const {user, password} = req.body;
  //  Check if user exists
  if (user == db.users[0].name && password === db.users[0].password) {

    // Create the payload to create JWT
    const payload = {
      user,
      password
    };

    // Sign token with userName and password, return JWT in header
    const signedToken = sign(payload, secret);
    // Pass data to the next handler function
    res.locals.token = signedToken;
    next();
    return
  };

  // Error is user does not exists
  res.status(403).json({
    message: 'No user found',
    status: 403,
  });
};

export default loginMiddleware;