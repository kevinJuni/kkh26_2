import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroPad'
})
export class ZeroPadPipe implements PipeTransform {

  transform(input: any, maximum: number, side?: any): string {
    side = side || 'left';

    if (input === null)
      return '';

		if (input === undefined)
			input = ""
		if (input.length >= maximum)
			return input

		let zeros = "0".repeat(maximum);

    if (side == 'right') {
      return (input + zeros).slice(0, maximum);
    } else {
      return (zeros + input).slice(-1 * maximum);
    }
  }

}
