import { FastifyPluginCallback } from 'fastify';

export default <FastifyPluginCallback>async function (app) {
    const routes = [
        app.register(import('./create')),
        app.register(import('./find')),
        app.register(import('./get-by-id')),
        app.register(import('./update')),
        app.register(import('./delete')),
    ];

    await Promise.all(routes);
};
