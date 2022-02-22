const GetGame = (db, cache) => {
  return async (req, res) => {
    const id = req.params.id;

    console.log('id : ', id);
    const game = await db.getGame(id);
    console.log(game);
    if (game) {
      res.json({ message: 'Success', status: 200, data: game })
      return
    }
    res.status(200).json({ message: 'No game was found', status: 200 })
  }
}

export default GetGame;