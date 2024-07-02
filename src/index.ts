import { ExtractPattern, ExtractResult, RecursivePartial, isHole } from './util'

export const patch = <T>(t: T, p: RecursivePartial<T>): T => {
    for (const k in p) {
        const v = p[k]
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
    const n: any = {}
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
            n[k] = v
        }
    }
    return n
}

export const extract = <T, P extends ExtractPattern<T>>(t: T, p: P): ExtractResult<T, P> => {
    const n: any = {}
    for (const k in p) {
        const v = p[k]
        if (isHole(v)) {
            // @ts-ignore
            n[k] = k in t ? t[k] : undefined
        } else {
            // @ts-ignore
            if (k in t && typeof t[k] === 'object') {
                // @ts-ignore
                n[k] = extract(t[k], p[k])
            }
        }
    }
    return n
}
