


export function makeRange (from: number, to: number, step?: number) {
    var result = [];

    step = step || 1;

    for (var value = from; value < to; value += step) {
        result.push(value);
    }

    return result;
}