import { createClient } from 'redis';

// Redis instance
const connectRedis =  () => {
const Redis = createClient({url: 'redis://172.24.0.2:6379'});
  Redis.connect()
    .then(() => {
      console.log('Connected redis');
  });
  return Redis;
};

const InternalCache = () => {
 const setUserToken =  (user, token) => {
  const redisClient = connectRedis();
  redisClient.set(user, token)
    .then(result => {
      result === 'OK' ? console.log(`New user cache created ${user}`) : console.log('[Redis setUserToken] Error creating new user');
    })
  }

  const getUserToken = async (user) => {
    const redisClient = connectRedis();
    const userToken = await redisClient.get(user, (result) => {
      console.log('[Redis getUserToken] Get user token: ', result);

      return result
    })
      .then(r => {
        return r
      })
    // await redisClient.flushAll()
    console.log('USER', userToken);
    return userToken
  }

  const removeUserToken = async (user) => {
    const redisClient = connectRedis();
    const all = await redisClient.get(user, (err, re) => {
      console.log(re);
    })
    console.log('Before', all);
    redisClient.del(user);
      const al = await redisClient.get(user, (err, re) => {
      console.log(re);
    })
    console.log('after ', al);
  } 

  return {
    setUserToken,
    getUserToken,
    removeUserToken,
  }
}

export default InternalCache;