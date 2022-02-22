import DB from '../../db/model/models/index.mjs';
import GameRepo from '../../db/repository/game/index.mjs';
import InternalCache from '../../cache/redis/index.mjs';

import CreateGame from './createGame.mjs';
import GetGame from './getGame.mjs';
import PlayGame from './playGame.mjs';

const db = GameRepo(DB.Game);
const cache = InternalCache();

const initGameService = () => {
 const gameServices = {}

 gameServices.CreateGame = CreateGame(db, cache);
 gameServices.GetGame = GetGame(db, cache);
 gameServices.PlayGame = PlayGame(db, cache);
//  gameSevices.Login = Login(db, cache);
//  gameSevices.GetUsers = GetUsers(db, cache);
//  gameSevices.Logout = Logout(db, cache);
//  gameSevices.RefreshToken = RefreshToken(db, cache);

 return gameServices;
}

export default initGameService;