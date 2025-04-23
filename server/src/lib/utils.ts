export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const isObjectId = (tag: string) => {
    return /^[0-9a-fA-F]{24}$/.test(tag);
};
