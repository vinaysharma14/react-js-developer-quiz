/**
 * a dedicated mapping of the result to be printed
 * on successful division of an `input` with a divisor
 *
 * maintaining a mapping is much more scalable, because we won't
 * need to touch `printResult()` every time new divisors and their
 * respective results are added as per future requirements
 */
const DIVISOR_RESULT_MAPPING: Record<number, string>[] = [
  { 22: 'candybar' },
  { 11: 'bar' },
  { 2: 'candy' },
];

/**
 * the function is kept dead simple with just
 * the logic where it iterates over the mapping
 * and prints the `result` upon successful division
 * with the divisor else the `input` itself
 */
const printResult = (input: number) => {
  for (let mapping of DIVISOR_RESULT_MAPPING) {
    const [divisor, result] = Object.entries(mapping)[0];

    if (!(input % Number(divisor))) {
      return console.log(result);
    }
  }

  console.log(input);
};

printResult(2); // prints candy
printResult(3); // prints 3
printResult(10); // prints candy
printResult(11); // prints bar
printResult(22); // prints candybar
printResult(44); // prints candybar
printResult(50); // prints candy
printResult(51); // prints 51
