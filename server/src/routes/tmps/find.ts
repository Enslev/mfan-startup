import { Type } from '@sinclair/typebox';
import { FastifyPluginCallback, FastifySchema } from 'fastify';
import { PipelineStage } from 'mongoose';

import { FastifyReplyTypebox, FastifyRequestTypebox } from '@lib/fastify-types';
import { TmpModel } from '@lib/mongodb/models/tmp.model';
import { tmpSchema } from '@lib/schemas/tmp.schedule';

export default <FastifyPluginCallback>function (app, opts, done) {
    const schema = {
        querystring: Type.Object({
            name: Type.Optional(Type.String()),
        }),
        response: {
            200: Type.Array(tmpSchema),
        },
    } satisfies FastifySchema;

    app.route({
        url: '/',
        method: 'GET',
        schema,
        handler: async (
            req: FastifyRequestTypebox<typeof schema>,
            reply: FastifyReplyTypebox<typeof schema>,
        ) => {
            const aggregatePipeline: PipelineStage[] = [];

            const match: Record<string, string> = {};

            if (req.query.name) {
                match.name = req.query.name;
            }

            if (Object.keys(match).length > 0) {
                aggregatePipeline.push({
                    $match: match,
                });
            } else {
                // If no query params, we still need to match all documents
                aggregatePipeline.push({
                    $match: {},
                });
            }

            const docs = await TmpModel.aggregate(aggregatePipeline).exec();
            await reply.send(docs);
        },
    });

    done();
};
