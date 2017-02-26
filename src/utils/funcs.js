export const noOp = () => {}

export function combineProcessors (...processors) {
    return (state) => processors.reduce((result, processor) => processor(result), state)
}
