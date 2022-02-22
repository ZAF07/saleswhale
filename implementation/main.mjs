import express from 'express';
import errorMiddleware from './middleware/error/error.mjs';
// import {authorize} from './middleware/authenticate.js';
import {dirname} from 'path';
import {readFile} from 'fs';
import { stripLetter } from './utils/helpers/format/index.mjs';

import userRouter from './router/user/index.mjs';
import gameRouter from './router/game/index.mjs';

const app = express();
app.use(express.json())
app.use('/user', userRouter);
app.use('/game', gameRouter);
app.use(errorMiddleware);

// Error handler
app.use((err, req, res, next) => {
  console.log('error middleware');
  console.error(err.stack);
  res.status(500).send('Some Error occured')
})

app.listen(3000, console.log('listening to http://localhost:3000'));