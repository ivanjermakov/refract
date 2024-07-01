import { patch, patched } from '.'
import { RecursivePartial } from './util'

describe('index', () => {
    it('empty', () => {})

    it('patch', () => {
        type A = { a: number; b?: A }
        const a: RecursivePartial<A> = { a: 4, b: { a: 6 } }
        const p: RecursivePartial<A> = { b: { a: 9, b: { a: 0 } } }
        const n = patch(a, p)
        expect(n).toBe(a)
        expect(n).toEqual({ a: 4, b: { a: 9, b: { a: 0 } } })
    })

    it('patched', () => {
        type A = { a: number; b?: A }
        const a: RecursivePartial<A> = { a: 4, b: { a: 6 } }
        const p: RecursivePartial<A> = { b: { a: 9, b: { a: 0 } } }
        const n = patched(a, p)
        expect(a !== n).toBeTrue()
        expect(n).toEqual({ a: 4, b: { a: 9, b: { a: 0 } } })
    })
})
