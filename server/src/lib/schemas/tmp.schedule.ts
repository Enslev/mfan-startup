import { Type } from '@sinclair/typebox';

import { MongooseDateType, MongooseObjectIdType } from '@lib/fastify-types';

export const tmpSchema = Type.Object({
    _id: MongooseObjectIdType,
    name: Type.String(),
    createdAt: MongooseDateType,
    updatedAt: MongooseDateType,
});
