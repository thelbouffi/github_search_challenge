import 'module-alias/register';

import config from '@config/index';
import { start } from '@lib/express.lib';

// project start
(async () => {
  start(config);
})();
