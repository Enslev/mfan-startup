export type NonNullableProperties<T> = {[K in keyof T]: NonNullable<T[K]>}

export type RemoveNull<T> = Exclude<T, null | undefined>;

export type DeepKeys<T> = DeepKeysInternal<T, ''>;
type DeepKeysInternal<T, Prefix extends string> = T extends object? (
    {
        [K in keyof T]:
            K extends string
                ? `${Prefix}${K}` | DeepKeysInternal<T[K], `${Prefix}${K}.`>
                : never
    }[keyof T]
) : never;

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object
        ? DeepPartial<T[K]>
        : T[K]
}

export type PathValue<T, Path extends string> =
    Path extends `${infer Key}.${infer Rest}` ?
        Key extends keyof T ?
            PathValue<T[Key], Rest>
            : never
        : Path extends keyof T ?
            T[Path]
            : never;
