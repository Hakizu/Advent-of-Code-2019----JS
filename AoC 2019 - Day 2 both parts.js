"use strict"

const fs = require(`fs`)
const source = fs.readFileSync("./Textinput/2019.txt", "utf8")

function getValues(firstNumber, secondNumber, input) {
    let numberArray = []
    numberArray.push(parseInt(input [firstNumber]))
    numberArray.push(parseInt(input [secondNumber]))
    return numberArray
}

let input = source.split(",")
input[1] = 12
input[2] = 2
function opCode(input) {
    for(let i = 0; i < input.length; i += 4) {
        const toDo = parseInt(input[i])
        if (toDo === 99) {break}
        const numberArray = getValues(input[i + 1], input[i + 2], input)
        
        let result = null
        if (toDo === 1) {
            result = numberArray[0] + numberArray[1]
        }
        if (toDo === 2) {
            result = numberArray[0] * numberArray[1]
        }        
        const resultPosition = input[i + 3]
        input[resultPosition] = result
    }
    return input[0]
}
console.log(opCode(input))

// ------- part 2
let resultArray = []

for(let i = 0; i <= 99; i++) {    
    for(let j = 0; j <= 99; j++){
        let currentData = source.split(",")        
        currentData[1] = i
        currentData[2] = j

        const fieldZero = opCode(currentData)
        const output = (100 * i + j)
        resultArray.push(fieldZero)
        resultArray.push(output)
    }
}
let outputPosition = (resultArray.indexOf(19690720)) + 1
console.log(resultArray[outputPosition])
