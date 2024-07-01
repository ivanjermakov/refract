import { RecursivePartial } from './util'

export const patch = <T>(t: T, p: RecursivePartial<T>): T => {
    for (const k in p) {
        const v = p[k]
        // @ts-ignore
        if (typeof t[k] === 'object' && typeof v === 'object') {
            // @ts-ignore
            patch(t[k], v)
        } else {
            // @ts-ignore
            t[k] = v
        }
    }
    return t
}

export const patched = <T>(t: T, p: RecursivePartial<T>): T => {
    const n: { [key: string]: T[keyof T] } = {}
    for (const k in t) {
        if (!(k in p)) {
            n[k] = t[k]
        }
    }
    for (const k in p) {
        const v = p[k]
        if (typeof t[k] === 'object' && typeof v === 'object') {
            // @ts-ignore
            n[k] = patched(t[k], v)
        } else {
            // @ts-ignore
            n[k] = v
        }
    }
    // @ts-ignore
    return n
}
