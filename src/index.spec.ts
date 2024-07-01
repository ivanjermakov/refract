import { foo } from "."

describe('index', () => {
    it('foo', () => {
        expect(foo()).toEqual(5)
    })
})
