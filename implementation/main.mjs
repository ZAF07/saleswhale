import express from 'express';
import errorMiddleware from './middleware/error/error.mjs';

import userRouter from './router/user/index.mjs';
import gameRouter from './router/game/index.mjs';
console.log('correct');
const app = express();
app.use(express.json())
app.use('/user', userRouter);
app.use('/games', gameRouter);
app.use(errorMiddleware);

// Error handler
app.use((err, req, res, next) => {
  console.log('error middleware');
  console.error(err.stack);
  res.status(500).send('Some Error occured')
})
const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on ${port}`));