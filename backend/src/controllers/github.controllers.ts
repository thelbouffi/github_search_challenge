import { Request, Response, NextFunction } from 'express';
import { default as Ajv } from 'ajv';
import ajvErrors from 'ajv-errors';
import { Octokit } from '@octokit/rest';

import config from '@config/index';
import client from '@lib/redis.lib';
import * as bodySchema from '@schemas/bodySchema.json';
import { IRequest } from '@interfaces/app.interfaces';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

const octokit = new Octokit();

/**
 * hello app for test
 * @controller hello
 * @param {Request} req The request
 * @param {Response} res The response
 */
export function hello(_req: Request, res: Response): Response {
  return res.status(200).send('Hello from app');
}

/**
 * json schema validation for verifying the posted request body
 * @controller validateBody
 * @param {Request} req The request
 * @param {Response} res The response
 * @param {Function} next Go to the next middleware
 */
export function validateBody(_req: Request, res: Response, next: NextFunction): Response | void {
  const { body } = _req;

  const validate = ajv.compile(bodySchema);
  if (!validate(body)) {
    return res.status(400).json({
      success: false,
      results: validate?.errors?.map((err) => ({
        message: err.message,
        data: err.params,
      })),
    });
  }
  return next();
}

/**
 * verify redis and return the found value else go to next controller
 * @controller redisSearch
 * @param {Request} req The request
 * @param {Response} res The response
 * @param {Function} next Go to the next middleware
 */
export async function redisSearch(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { body } = _req;
  const { type, queryBody } = body;
  const key = `${type}_${queryBody};`;

  let cached: string | null = null;
  try {
    cached = await new Promise((resolve, reject) => {
      client.GET(key, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  } catch (error) {
    return res.status(400).json({ success: false, results: 'Somethig wrong while serching in cache' });
  }
  
  if (cached) return res.status(200).json({ success: true, results: JSON.parse(cached) });

  return next();
}

/**
 * make a restfull call to get result corresponding to the posted body
 * @controller restSearch
 * @param {IRequest} req The request
 * @param {Response} res The response
 * @param {Function} next Go to the next middleware
 */
export async function restSearch(
  _req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { body, query } = _req;
  const { queryBody, type } = body;
  const { per_page = 10, page = 1 } = query;

  let githubResults;
  switch (type) {
    case 'Users':
      try {
        githubResults = await octokit.search.users({
          q: queryBody,
          per_page: per_page as number,
          page: page as number,
        });
      } catch (e) {
        return res.status(400).json({
          success: false,
          results: e,
        });
      }
      break;

    case 'Repositories':
      try {
        githubResults = await octokit.search.repos({
          q: queryBody,
          per_page: per_page as number,
          page: page as number,
        });
      } catch (e) {
        return res.status(400).json({
          success: false,
          results: e,
        });
      }
      break;

    case 'Issues':
      try {
        githubResults = await octokit.search.issuesAndPullRequests({
          q: queryBody,
          per_page: per_page as number,
          page: page as number,
        });
      } catch (e) {
        return res.status(400).json({
          success: false,
          results: e,
        });
      }
      break;

    default:
      return res.status(400).json({ success: false, results: 'Worng Params' });
  }

  if (!_req.meta) _req.meta = {};
  _req.meta.githubResults = githubResults;
  return next();
}

/**
 * save found results into redis cache
 * @controller cacheSave
 * @param {IRequest} req The request
 * @param {Response} res The response
 * @param {Function} next Go to the next middleware
 */
export async function cacheSave(
  _req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { meta, body } = _req;
  const { type, queryBody } = body;
  const key = `${type}_${queryBody};`;
  const { expiration } = config.redis;
  const githubResults = meta?.githubResults;

  if (githubResults) {
    let cached: 'OK' | undefined = undefined;
    try {
      cached = await new Promise((resolve, reject) => {
        client.set(key, JSON.stringify(githubResults), 'EX', expiration, (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    } catch (error) {
      return res.status(400).json({ success: false, results: 'Somethig wrong while caching data' });
    } 

    if (cached !== 'OK')
      return res.status(400).json({ success: false, results: 'Somethig wrong while caching data' });
  }
  return next();
}

/**
 * send found results
 * @controller sendResults
 * @param {IRequest} req The request
 * @param {Response} res The response
 */
export async function sendResults(_req: IRequest, res: Response): Promise<Response | void> {
  const { githubResults } = _req.meta;

  if (!githubResults) {
    return res.status(400).json({ success: false, results: 'Somethig wrong! results not found' });
  }
  return res.status(200).json({ success: true, results: githubResults });
}

/**
 * clear redis cache
 * @controller clearCache
 * @param {IRequest} req The request
 * @param {Response} res The response
 */
export async function clearCache(_req: IRequest, res: Response): Promise<Response | void> {
  let cached: 'OK' | undefined = undefined;
  try {
    cached = await new Promise((resolve, reject) => {
      client.flushdb((err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  } catch (error) {
    return res.status(400).json({ success: false, results: 'Somethig wrong while clearin cache' });
  }

  if (cached !== 'OK')
    return res.status(400).json({ success: false, results: 'Somethig wrong while clearin cache' });

  return res.status(200).json({ success: true, results: 'Cache cleared successfully' });
}
