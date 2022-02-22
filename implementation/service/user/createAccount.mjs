// import { createUser } from '../../db/users/index.mjs';
// import UserRepo from '../../db/users/index.mjs';
// import { setUserToken } from '../../cache/redis/index.mjs';
import generateToken from '../../utils/jwt/token.mjs';

const CreateAccount = (db, cache) => {
  return async (req, res) => {
    const { user, password } = req.body;
    
    const newUser = await db.createUser({user, password});
    const payload = {
      id: newUser.id, 
      name: user,
      password
    };
    const { token, refreshToken } = generateToken(payload, 'pair');

    cache.setUserToken(user, refreshToken);
    
    res.status(200).json({
      message: 'Successfully created a new user',
      status: 200,
      user: newUser.name,
      token,
      refreshToken
    });
  }
};

export default CreateAccount;