import { Request, Router } from 'express';

export interface IRequest extends Request {
  meta?: any;
}

export interface IRoute {
  r: Router;
  prefix: string;
}

export interface IAppConfig {
  files: {
    routes: string[];
  };
  env: string;
  app: {
    host: string;
    port: number;
  };
}
