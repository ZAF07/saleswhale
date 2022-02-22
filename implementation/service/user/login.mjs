import generateToken from '../../utils/jwt/token.mjs';

const Login = (db, cache) => {
  return async (req, res) => {
    const {user, password} = req.body;
    console.log('LOGIN REQ BOIDY : ', user);
    const userExists = await db.getOne(user);
    //  Check if user exists in DB 
    if (userExists) {
      const  { id, name } = userExists;
      const payload = {
        id,
        name,
        password
      };

      // Sign token with id, userName and password, return JWT in body
      const { token, refreshToken } = generateToken(payload, 'pair');

      // Set user refresh token in cache
      cache.setUserToken(user, refreshToken);
    
      res.status(200).json({
        message: 'Success login',
        status: 200,
        token,
        refreshToken
      })
      return;
    };

    // Error is user does not exists
    res.status(403).json({
      message: 'No user found',
      status: 403,
    });
  }
}

export default Login;