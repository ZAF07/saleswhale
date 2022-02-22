import {randomBytes} from 'crypto';

var token = randomBytes(64).toString('hex');
console.log(`Token : ${token}`);