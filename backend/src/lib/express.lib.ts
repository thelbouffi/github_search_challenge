import { AddressInfo } from 'net';
import * as Express from 'express';
import * as bodyParser from 'body-parser';

import { IAppConfig, IRoute } from '@interfaces/app.interfaces';

import './redis.lib';

export async function start(config: IAppConfig): Promise<void> {
  // instantiate express
  const app = Express();

  // set body parser middlewares
  app.use(bodyParser.json({ limit: '4mb' }));
  app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }));

  // load all routes
  config.files.routes.forEach((path) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { route } = require(path) as { route: IRoute };
    app.use(route.prefix, route.r);
  });

  // specify host and port for server to listen on
  const server = app.listen(config.app.port, config.app.host, () => {
    const { address, port } = server.address() as AddressInfo;
    console.info('server started at http://%s:%s/', address, port);
  });

  // make sure to kill server process on sigint
  process.on('SIGINT', ()=>{
    console.log('stop server')
    server.close();
  })
}
