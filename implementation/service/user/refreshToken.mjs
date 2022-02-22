import generateToken from '../../utils/jwt/token.mjs';

const RefreshToken = (_,cache) => {
  return async (req, res, next) => {
    // Grab data abstarcted out for us in the middleware layer
    const { name, token, password } = res.locals;
    console.log('GIVEN REFRESH TOKEN : '. token);

    await cache.getUserToken(name).then((result) => {
      console.log('USER TOKEN ?? : ', result);
      if (!result || result === null) {
        next(new Error('Invalid token'))
        return
      }
    // Get user credentials from auth middleware
    const { id, name, password } = res.locals;
    console.log('IN REFRESH : ', res.locals);

      // const newToken = generateRefreshToken(user, password, 'refresh');
      const newToken = generateToken({ id, name, password }, 'single');
      console.log('NEW TOKEN', newToken);
      res.status(200).json({ message: 'Refresh Token Success', status: 200, token: newToken })
    })
  }
};

export default RefreshToken;