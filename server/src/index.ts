import cors from '@fastify/cors';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyWebsocket from '@fastify/websocket';
import { initWebsocket } from '@services/websocket.service';
import Fastify from 'fastify';

import { httpErrorHandler, notFoundHandler } from '@lib/http-errors';
import { connectToMongoDB } from '@lib/mongodb';
import routes from './routes';

(async () => {
    console.log('⏱️  Starting server...');

    await connectToMongoDB();

    const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>();

    await fastify.register(fastifyWebsocket);
    await initWebsocket(fastify);

    await fastify.register(cors, {
        origin: '*',
        methods: [ 'GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS' ],
        allowedHeaders: [ 'Content-Type', 'access-control-allow-headers' ],
    });

    fastify.setErrorHandler(httpErrorHandler);
    fastify.setNotFoundHandler(notFoundHandler);

    await fastify.register(routes, { prefix: '/api' });

    const port = Number(process.env['SERVER_PORT']) || 9001;
    const address = await fastify.listen({ port, host: '0.0.0.0' });

    console.log(`💡 Server running on ${address}`);

})().catch((err) => {
    console.error('An error occurred while starting the server:');
    console.error(err);
    process.exit(1);
});
