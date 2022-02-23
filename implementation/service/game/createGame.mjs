import generateToken from '../../utils/jwt/token.mjs';

const CreateGame = (db, cache) => {
  return async (req, res) => {
    const { id, name } = res.locals;
    console.log('USER TOKEN FROM MIDDLEWARE : ', id, name);
    const { random, duration, board } = req.body;
    console.log('REQ BODY: ', random, duration, board);
    let gameBoard = board;
    const payload = {
      id,
      name
    };
    // Generate token to authenticate game
    const token = generateToken(payload, 'game');
    console.log('game token ?? : ', token);

    if (random) {
      gameBoard = 'tap*eaksobrss*xd'
    }
    
    const newGameDetails = { userId: id, board: gameBoard, duration, token, timeRemaining: duration, points: 0 }
    const newGame = await db.createGame(newGameDetails);

    res.status(200).json({
      message: 'Successfully created a new game',
      status: 200,
      game_id: newGame.id 
    });
  }
};

export default CreateGame;