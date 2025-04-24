import { Type } from '@sinclair/typebox';
import { FastifyPluginCallback, FastifySchema } from 'fastify';
import { MongoServerError } from 'mongodb';

import { FastifyReplyTypebox, FastifyRequestTypebox } from '@lib/fastify-types';
import { ConflictError, InternalServerError } from '@lib/http-errors';
import { TmpModel } from '@lib/mongodb/models/tmp.model';
import { tmpSchema } from '@lib/schemas/tmp.schedule';

export default <FastifyPluginCallback>function (app, opts, done) {
    const schema = {
        body: Type.Object({
            name: Type.String(),
        }),
        response: {
            200: tmpSchema,
        },
    } satisfies FastifySchema;

    app.route({
        url: '/',
        method: 'POST',
        schema,
        handler: async (
            req: FastifyRequestTypebox<typeof schema>,
            reply: FastifyReplyTypebox<typeof schema>,
        ) => {
            const newDoc = new TmpModel({
                name: req.body.name,
            });

            try {
                await newDoc.save();
            } catch (error) {
                if (error instanceof MongoServerError) {
                    if (error.code === 11000) {
                        throw new ConflictError('Duplicate key error', {
                            value: error.keyValue,
                        });
                    }
                }

                console.error('Error creating document:', error);
                throw new InternalServerError();
            }

            await reply.send(newDoc);
        },
    });

    done();
};
