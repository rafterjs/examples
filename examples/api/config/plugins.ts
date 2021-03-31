import { IPlugin, IPluginsConfig } from '../lib/vendor';

export default (): IPluginsConfig => new Set<IPlugin>(['@rafterjs/cors-plugin']);
