import { TObject, Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Ref } from '@typegoose/typegoose';
import {
    ContextConfigDefault,
    FastifyReply,
    FastifyRequest,
    FastifySchema,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RouteGenericInterface,
} from 'fastify';
import mongoose from 'mongoose';

// Return scheam types for values from mongoose
export const MongooseDateType = Type.Optional(Type.Unsafe<Date>({ type: 'string', format: 'date-time' }));
export const MongooseObjectIdType = Type.Unsafe<mongoose.Types.ObjectId>();

// This is for input validation schema for fastify
export const ObjectIdStringType = Type.String({ pattern: '^[0-9a-fA-F]{24}$' });

export const referenceType = <T>(schema: TObject) => {
    return Type.Array(Type.Union([ schema, Type.Unsafe<Ref<T>>() ]));
};

export type FastifyRequestTypebox<TSchema extends FastifySchema> = FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
>;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    ContextConfigDefault,
    TSchema,
    TypeBoxTypeProvider
>
