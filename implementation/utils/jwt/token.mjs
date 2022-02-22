import JWT from 'jsonwebtoken';
import generateRefreshToken from './refreshToken.mjs';
const { sign } = JWT;
const secret = process.env.SECRET_TOKEN;

const generateToken = ({ id, name, password }, type) => {
  console.log('GENERATEING TOKENS utils/jwt/token.mjs');
  // Payload to generate token
  const payload = { 
    id,
    name,
    password,
  };
  console.log('[TOKEN.mjs] PAYLOAD TO SIGN : ', payload);

  // Based on type arg, generate auth token and refresh token or only an auth token
  switch (type) {
    case 'pair':
      console.log('GENERATING TOKEN');
      // Sign token with userName and password, return JWT in header
      const token = sign(payload, secret, { expiresIn: '10m' });
      const refreshToken = sign(payload, secret);
      // Store refresh token in cache
      return { token, refreshToken };
    case 'single':
      // Call refresh token function to check if refresh token exists, if so, retrun a new signed token with expiry
      console.log('GENERATING REFRESH TOKEN');
      const newToken = generateRefreshToken(payload);
      return { token: newToken };
    case 'game':
      const gameToken = sign(payload, secret);
      return gameToken;

    default:
      return { token: '', refreshToken: '' }
  }
}

export default generateToken;