import JWT from 'jsonwebtoken';
const { sign } = JWT;
const secret = process.env.SECRET_TOKEN;

const generateRefreshToken = ({ id, name, password }) => {
  const payload = {
    id,
    name,
    password
  };

  const refreshToken = sign(payload, secret, { expiresIn: '10m' });
  return refreshToken;
}

export default generateRefreshToken;