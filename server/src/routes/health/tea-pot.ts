import { Type } from '@sinclair/typebox';
import { FastifyPluginCallback, FastifySchema } from 'fastify';

import { FastifyReplyTypebox, FastifyRequestTypebox } from '@lib/fastify-types';
import { TeapotError } from '@lib/http-errors';

export default <FastifyPluginCallback>function (app, opts, done) {
    const schema = {
        response: {
            200: Type.String(),
        },
    } satisfies FastifySchema;

    app.route({
        url: '/tea-pot',
        method: 'GET',
        schema,
        handler: async (
            _req: FastifyRequestTypebox<typeof schema>,
            _reply: FastifyReplyTypebox<typeof schema>,
        ) => {

            throw new TeapotError('Instruction error', {
                reasoning: 'I refuse to brew coffee because I am a teapot',
            });
        },
    });

    done();
};
