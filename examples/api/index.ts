import { Server } from './lib/Server';

export * from './config';
export * from './lib/response';
export * from './lib/request';
export * from './lib/utils';
export * from './lib/vendor';
export * from './lib/Server';

const server = new Server();

async function run(): Promise<void> {
  try {
    await server.start();
  } catch (error) {
    console.error(error);
    await server.stop();
    process.exit(1);
  }
}

run();
