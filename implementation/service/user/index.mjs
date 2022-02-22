// import db from '../../model/models.js';
import CreateAccount from './createAccount.mjs';
import GetUsers from './getUsers.mjs';
import Login from './login.mjs';
import Logout from './logout.mjs';
import RefreshToken from './refreshToken.mjs';

import DB from '../../db/model/models/index.mjs';
import UserRepo from '../../db/repository/user/index.mjs';
import InternalCache from '../../cache/redis/index.mjs';

const db = UserRepo(DB.User);
const cache = InternalCache();

const initUserService = () => {
 const userServices = {}

 userServices.CreateAccount = CreateAccount(db, cache);
 userServices.Login = Login(db, cache);
 userServices.GetUsers = GetUsers(db, cache);
 userServices.Logout = Logout(db, cache);
 userServices.RefreshToken = RefreshToken(db, cache);

 return userServices;
}

export default initUserService;