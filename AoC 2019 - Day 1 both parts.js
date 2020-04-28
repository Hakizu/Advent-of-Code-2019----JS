"use strict"

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/2019.txt", "utf8").split("\n")

function fuelCalc (currentNumber) {
    const dividedInt = parseInt(currentNumber / 3)
    const result = dividedInt - 2
    return result
}

let moduleFuel =[] // for part 2
let output = 0
for(let i = 0; i < input.length; i++) {
    const currentNumber = input[i]
    const result = fuelCalc(currentNumber)
    moduleFuel.push(result)
    output += result
}
console.log(output)


// --- part 2

let outputTwo = output
let previousFuel = null
for(let i = 0; i < moduleFuel.length; i++){
    previousFuel = moduleFuel[i]
    while (previousFuel > 0) {
        previousFuel = fuelCalc(previousFuel)
        
        if (previousFuel <= 0) {continue}
        outputTwo += previousFuel        
    }
}
console.log(outputTwo)