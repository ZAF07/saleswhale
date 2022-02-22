const GameRepo = (db) => {
  const createGame = async ({ board, duration, userId, token, timeRemaining, points }) => {
    // const create = await db.Game.create({ board, duration, userId })
    const create = await db.create({ board, duration, userId, token, timeRemaining, points })
    console.log('CREATED NEW GAME DB : ', create);
    return create.dataValues;
  }

  const getGame = async (id) => {
    const game = await db.findOne({where: { id }});
    console.log('GOTTEN GAME FROM DB : ', game);
    if (game) {
      return game.dataValues;
    }
  }

  const updateGame = async (id, { timeRemaining, points }) => {
    const updatedGame = await db.update({ timeRemaining, points}, {where: { id}})
    console.log('DONE UPDATING : ', updatedGame);
  }

  return {
    createGame,
    getGame,
    updateGame
  }
  
}

export default GameRepo;
