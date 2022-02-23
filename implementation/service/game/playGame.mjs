import playBoggle from "../../utils/helpers/game/index.mjs";
import { calcPoints, calcTimeRemaining } from "../../utils/helpers/format/index.mjs";

const playGame = (db,cache) => {
  return async (req, res) => {
    let updatedFields = {};
    const { id } = req.params;
    const { word } = req.body;
    const { token} = res.locals;
    // console.log('DATA : ', id, word, token);
    console.log('ID !!!??? ', id);
    // Query DB for game details ( points, duration )
    const getGame= await db.getGame(id);
    if (getGame) {
      const { duration, board, points, timeRemaining } = getGame;
      // console.log('GAME DETAILS : ', gameDetails);
      // const b = 'atmenhkpjiorsvdb';
      let gameBoard;
      gameBoard = board
      if (!board) {
        gameBoard = ''
      }
      const game = playBoggle(word, gameBoard);
      console.log('GAME RESULT : ', game.valid);
  
      //  IF VALID, UPDATE DATABASE TO REFLECT CHANGES
      if (game.valid) {
        updatedFields.points = points + 1;
        updatedFields.timeRemaining = timeRemaining - 1;
      } else {
        updatedFields.points = points -1;
        updatedFields.timeRemaining = timeRemaining -1;
      }
      console.log('UPDATED FIELDS', updatedFields);
      db.updateGame( id , updatedFields);
  
      const data = {
        results: { valid: game.valid, reason: game.reason, points: updatedFields.points },
        details: { duration, timeRemaining: updatedFields.timeRemaining, board, token }
      }
      res.status(200).json({ message: 'Playing game', status: 200, data });
      return
    }

    res.status(200).json({ message: 'No game was found', status: 200 })

  }
}

export default playGame;

/*
store all these information in cache
{
  "id": 1,
  "token": "9dda26ec7e476fb337cb158e7d31ac6c",
  "duration": 12345,
  "board": "A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K",
  "time_left": 10000,
  "points": 10
}
*/


/* 
  TODO: 
    Make board dynamic (DONE)
    Read text file for default board generation (DONE)
    Wildcard word (DONE)

    Document project (Steps and setup of project)
    Spin up new RDS ( use redis postgres or RDS ? )
    complie to Docker compose
    Host 
*/