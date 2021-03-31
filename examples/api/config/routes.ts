import { IRoutes, IRouteConfig } from '../lib/vendor';

export default (): IRoutes =>
  new Set<IRouteConfig>([
    {
      endpoint: `/`,
      controller: `helloController`,
      action: `index`,
      method: `get`,
    },
  ]);
