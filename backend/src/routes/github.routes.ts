import { Router } from 'express';
import {  hello, validateBody, redisSearch, restSearch, cacheSave, sendResults, clearCache } from '../controllers/github.controllers';
const r = Router();

// routes defintion & middlewares associated to each route
r.get('/', [hello]);
r.post('/search', [validateBody, redisSearch, restSearch, cacheSave, sendResults]);
r.get('/clear-cache', [clearCache]); 

export const route = {
  r,
  prefix: '/api',
};