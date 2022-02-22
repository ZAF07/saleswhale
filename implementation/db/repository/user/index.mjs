const UserRepo = (db) => {
  const createUser = async ({ user, password }) => {
    const create = await db.create({ name: user, password })
    console.log('CREATED NEW USER DB : ', create);
    return create.dataValues;
  }
  
  const getAllUsers = async () => {
    const users = await db.findAll()
  
    let  userList = [];
    users.forEach(user => {
       userList.push(user.dataValues)
    });
    return userList;
  }

  const getOne = async (name) => {
    const user = await db.findOne({ where: { name } })
    console.log('RESULT DB : ', user !== null);
    if (user !== null) {
      return user.dataValues;
    }
  }
  
  return {
    getAllUsers,
    createUser,
    getOne
  }
  
}

export default UserRepo;
