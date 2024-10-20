interface ObjType {
    [key: string]: any
}

export const getChangedObjects = <T extends ObjType>(array1: T[], array2: T[], key: keyof T): T[] => {
    const map = new Map(array1.map((obj) => [obj[key], obj]))

    return array2.filter((obj2) => {
        const obj1 = map.get(obj2[key])
        return obj1 && obj1[key] !== obj2[key]
    })
}
