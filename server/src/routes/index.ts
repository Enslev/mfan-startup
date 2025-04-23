import { FastifyPluginCallback } from 'fastify';

export default <FastifyPluginCallback>async function (app) {
    const routes = [
        app.register(import('./health'), { prefix: '/health' }),
    ];

    await Promise.all(routes);
};
