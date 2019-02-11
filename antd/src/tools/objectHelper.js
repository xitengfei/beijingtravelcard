export const simpleDeepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}