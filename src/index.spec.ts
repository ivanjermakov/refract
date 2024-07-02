import { extract, patch, patched } from '.'
import { RecursivePartial, _ } from './util'

describe('index', () => {
    it('empty', () => {})

    it('patch', () => {
        type A = { a: number; b?: A }
        const a: A = { a: 4, b: { a: 6 } }
        const p: RecursivePartial<A> = { b: { a: 9, b: { a: 0 } } }
        const n = patch(a, p)
        expect(n).toBe(a)
        expect(n).toEqual({ a: 4, b: { a: 9, b: { a: 0 } } })
    })

    it('patched', () => {
        type A = { a: number; b?: A }
        const a: A = { a: 4, b: { a: 6 } }
        const p: RecursivePartial<A> = { b: { a: 9, b: { a: 0 } } }
        const n = patched(a, p)
        expect(a !== n).toBeTrue()
        expect(n).toEqual({ a: 4, b: { a: 9, b: { a: 0 } } })
    })

    it('extract', () => {
        type A = { a: number; b?: A }
        const a: A = { a: 4, b: { a: 6 } }
        const e = { b: { a: _, b: _ } }
        const n = extract(a, e)
        expect(n).toEqual({ b: { a: 6, b: undefined } })
        expect('b' in n.b!).toBeTrue()
    })
})
