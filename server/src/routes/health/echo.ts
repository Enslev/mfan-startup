import { Type } from '@sinclair/typebox';
import { FastifyPluginCallback, FastifySchema } from 'fastify';

import { FastifyReplyTypebox, FastifyRequestTypebox } from '@lib/fastify-types';

export default <FastifyPluginCallback>function (app, opts, done) {
    const schema = {
        body: Type.Object({
            data: Type.String(),
        }),
        response: {
            200: Type.String(),
        },
    } satisfies FastifySchema;

    app.route({
        url: '/echo',
        method: 'POST',
        schema,
        handler: async (
            req: FastifyRequestTypebox<typeof schema>,
            reply: FastifyReplyTypebox<typeof schema>,
        ) => {
            await reply.send(req.body.data);
        },
    });

    done();
};
