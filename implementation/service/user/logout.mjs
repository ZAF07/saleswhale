const Logout = (db,cache) => {
  return async (req, res) => {
    const {name} = res.locals;
    if (!name) throw new Error('invalid auth');
    cache.removeUserToken(name);
    res.json({ message: 'logout success', status: 200 })
  }
}

export default Logout;