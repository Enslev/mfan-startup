import { Type } from '@sinclair/typebox';
import { FastifyPluginCallback, FastifySchema } from 'fastify';

import { FastifyReplyTypebox, FastifyRequestTypebox, ObjectIdStringType } from '@lib/fastify-types';
import { NotFoundError } from '@lib/http-errors';
import { TmpModel } from '@lib/mongodb/models/tmp.model';

export default <FastifyPluginCallback>function (app, opts, done) {
    const schema = {
        params: Type.Object({
            tmpId: ObjectIdStringType,
        }),
        response: {
            204: Type.Never(),
        },
    } satisfies FastifySchema;

    app.route({
        url: '/:tmpId',
        method: 'DELETE',
        schema,
        handler: async (
            req: FastifyRequestTypebox<typeof schema>,
            reply: FastifyReplyTypebox<typeof schema>,
        ) => {
            const doc = await TmpModel.findByIdAndDelete(req.params.tmpId).exec();

            if (!doc) throw new NotFoundError('Document not found');

            await reply.status(204).send();
        },
    });

    done();
};
