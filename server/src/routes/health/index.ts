import { FastifyPluginCallback } from 'fastify';

export default <FastifyPluginCallback>async function (app) {
    const routes = [
        app.register(import('./ruok')),
        app.register(import('./echo')),
        app.register(import('./tea-pot')),
    ];

    await Promise.all(routes);
};
