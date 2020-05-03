"use strict"

const fs = require(`fs`)
const source = fs.readFileSync("./Textinput/2019.txt", "utf8")

function getValues(firstNumber, secondNumber, input) {
    let numberArray = []

    numberArray.push(parseInt(input [firstNumber]))
    numberArray.push(parseInt(input [secondNumber]))
    return numberArray
}

function opCode(input, prompt) {
    for(let i = 0; i < input.length; i += iteration) {
        const code = input[i].toString()
        if (code === "99") {break}

        const order = code.slice(-1)
        let parameterOne = code.slice(-3, -2)       
        let parameterTwo = code.slice(-4, -3)      
        let parameterThree = code.slice(-5, -4)

        if (parameterOne === "") {parameterOne = "0"}
        if (parameterTwo === "") {parameterTwo = "0"}
        if (parameterThree === "") {parameterThree = "0"}

        let parameterArray = []
        parameterArray.push(parameterThree)
        parameterArray.push(parameterTwo)
        parameterArray.push(parameterOne)

        if (order === "3") {
            let outputPosition = input[i + 1]
            input[outputPosition] = prompt
            iteration = 2
            continue
        }
        if (order === "4") {
            let outputPosition = input[i + 1]
            if (parameterArray[2] === ("1")) {outputPosition = i + 1}

            console.log(`output from 4: ${input[outputPosition]}`)
            iteration = 2
            continue
        }

        let firstNumber = input[i + 1]
        let secondNumber = input[i + 2]
        const resultPosition = input [i + 3]

        if (firstNumber < 0 && parameterArray[2] !== "1") {
            firstNumber = input.length + parseInt(firstNumber)
        }
        if (secondNumber < 0 && parameterArray[1] !== "1") {
            secondNumber = input.length + parseInt(secondNumber)
        }

        let numberArray = getValues(firstNumber, secondNumber, input)
        if (parameterArray[2] === "1") {numberArray[0] = firstNumber}
        if (parameterArray[1] === "1") {numberArray[1] = secondNumber}
        let result = null

        if (order === "1") {
            result = parseInt(numberArray[0]) + parseInt(numberArray[1])
        }

        if (order === "2") {
            result = numberArray[0] * numberArray[1]
        }

        input[resultPosition] = result  
        iteration = 4
    }
    return input[0]
}

let input = source.split(",")
let prompt = 1
let iteration = 2
opCode(input, prompt, iteration)