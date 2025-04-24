import { Type } from '@sinclair/typebox';
import { FastifyPluginCallback, FastifySchema } from 'fastify';
import { MongoServerError } from 'mongodb';

import { FastifyReplyTypebox, FastifyRequestTypebox, ObjectIdStringType } from '@lib/fastify-types';
import { ConflictError, InternalServerError, NotFoundError } from '@lib/http-errors';
import { TmpModel } from '@lib/mongodb/models/tmp.model';
import { tmpSchema } from '@lib/schemas/tmp.schedule';

export default <FastifyPluginCallback>function (app, opts, done) {
    const schema = {
        params: Type.Object({
            tmpId: ObjectIdStringType,
        }),
        body: Type.Object({
            name: Type.Optional(Type.String()),
        }),
        response: {
            200: tmpSchema,
        },
    } satisfies FastifySchema;

    app.route({
        url: '/:tmpId',
        method: 'POST',
        schema,
        handler: async (
            req: FastifyRequestTypebox<typeof schema>,
            reply: FastifyReplyTypebox<typeof schema>,
        ) => {
            const doc = await TmpModel.findById(req.params.tmpId);

            if (!doc) throw new NotFoundError('Document not found');

            doc.name = req.body.name ?? doc.name;


            try {
                await doc.save();
            } catch (error) {
                if (error instanceof MongoServerError) {
                    if (error.code === 11000) {
                        throw new ConflictError('Duplicate key error', {
                            value: error.keyValue,
                        });
                    }
                }

                console.error('Error updating document:', error);
                throw new InternalServerError();
            }

            await reply.send(doc);
        },
    });

    done();
};
