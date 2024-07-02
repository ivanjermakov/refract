export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object | undefined
          ? RecursivePartial<T[P]>
          : T[P]
}

export type ExtractHole = { _: undefined }
export const _: ExtractHole = { _: undefined }
export const isHole = (o: any): o is ExtractHole => {
    return '_' in o && o._ === undefined
}

export type ExtractPattern<T> = {
    [P in keyof T]?: T[P] extends object ? ExtractPattern<T[P]> : { [P in keyof T]: ExtractHole }
}

export type ExtractResult<T, E extends ExtractPattern<T>> = {
    [P in keyof E]?: T extends undefined
        ? undefined
        : P extends keyof T
          ? E[P] extends ExtractHole
              ? T[P]
              : E[P] extends object
                ? ExtractResult<T[P], E[P]>
                : unknown
          : void
}
