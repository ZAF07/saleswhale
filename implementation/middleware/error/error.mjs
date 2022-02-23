import _ERR_STATUS from '../../utils/enums/error_status.mjs';
import { createErrorMsg } from '../../utils/helpers/format/index.mjs';

// Error handler
export default (err, _, res, next) => {
  console.error('[ERROR_MIDDLEWARE] Error message :' ,err.message);
  console.error('[ERROR_MIDDLEWARE] Error stack : ', err.stack);

  switch (err.message) {
    case _ERR_STATUS[4004]:
        createErrorMsg(401, 'JWT token expired', res);
      break;
    case _ERR_STATUS[4001]:
      createErrorMsg(401, 'Auth header required', res)
      break;
    case 'invalid token':
      createErrorMsg(401, err.message, res)
      break;
    case _ERR_STATUS[4005]:
      createErrorMsg(401, err.message, res)
    case 'invalid auth':
      createErrorMsg(401, err.message, res)
    case 'invalid signature':
      createErrorMsg(401, err.message, res)
    case 'Invalid token':
      createErrorMsg(401, err.message, res)
    default:
      res.status(500).send('Some Error occured')
      break;
  }
};

