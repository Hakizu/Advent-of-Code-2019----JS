import { readFileSync } from 'fs'

const input: string [] = readFileSync('./Textinput/Day1.txt', 'utf8').split('\n');

const fuelForEachModule: number[] = input.map(value => {
  if (typeof(parseInt(value)) === 'number') {
    return Math.floor(parseInt(value) / 3 ) - 2
  }
  else {
    console.log('Not all numbers');
  }
})
console.log(fuelForEachModule);

let totalFuel: number = fuelForEachModule.reduce((a,b) => a + b)
console.log(totalFuel);

// part 2
let additionalFuel = 0

for(let i = 0; i < fuelForEachModule.length; i++) {
  additionalFuel = fuelForEachModule[i]
  while (additionalFuel > 0) {
    additionalFuel = Math.floor(additionalFuel / 3 - 2)
    if (additionalFuel < 1) continue
    totalFuel += additionalFuel
  }
}
console.log(totalFuel);
