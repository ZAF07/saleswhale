const GetUsers = (db, cache) => {
  return async (req, res) => {
    const data = await db.getAllUsers();
    res.json({ message: 'Success', status: 200, data }) 
  }
}

export default GetUsers;