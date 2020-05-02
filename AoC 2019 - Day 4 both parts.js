"use strict"

const fs = require(`fs`)
const source = fs.readFileSync("./Textinput/2019.txt", "utf8").split("-")
const startingNumber = source[0]
const endingNumber = source[1]

const possibleNumbers = endingNumber - startingNumber
let possibleCombinations = 0

function getInputAsString(number , i){
    const currentInput = parseInt(number) + i
    const stringNumber = currentInput.toString()
    return stringNumber
}

let allow = null 
for(let i = 0; i < possibleNumbers; i++) {
    const currentInputArray = getInputAsString(startingNumber, i)
    allow = false

    for(let j = 0; j < currentInputArray.length; j++) {
        if  (currentInputArray[j] > currentInputArray[j + 1]){break}
        if  (currentInputArray[j] === currentInputArray[j + 1]) {allow = true}
        if  (allow && j + 1 === currentInputArray.length) {
            possibleCombinations++
        }
    }
}
console.log(possibleCombinations)

//---------------- Part 2
possibleCombinations = 0 
for(let i = 0; i < possibleNumbers; i++) {
    const currentInputArray = getInputAsString(startingNumber, i)
    let existingDouble = {}

    for(let j = 0; j < currentInputArray.length; j++){

        if  (currentInputArray[j] > currentInputArray[j + 1]){break}

        if  (currentInputArray[j] === currentInputArray[j + 1]) {
            existingDouble[currentInputArray[j]] = (existingDouble[currentInputArray[j]] + 1) || 2            
        }
        if  (Object.values(existingDouble).includes(2) && 
            j + 1 === currentInputArray.length) {possibleCombinations++}      
    }
}
console.log(possibleCombinations)