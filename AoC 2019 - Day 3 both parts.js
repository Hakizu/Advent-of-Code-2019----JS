"use strict"

const fs = require(`fs`)
const source = fs.readFileSync("./Textinput/2019.txt", "utf8")
const inputArray = source.split("\n")

const firstInput = inputArray[0].split(",")
const secondInput = inputArray[1].split(",")


function executeOrder66(currentOrder, grid,indexArray, second) {
    let directions = currentOrder.slice(1)
    if (currentOrder.includes("R")) {
        for(let j = 0; j < directions; j++) {
            stepCount += 1
            x += 1
            grid[x][y] += 1
            if (grid[x][y] >= 2 && second) {
                indexArray.push(x,y)
                stepArray.push(stepCount) 
            }
        }        
    }
    if (currentOrder.includes("L")) {
        for(let j = 0; j < directions; j++) {      
            stepCount += 1      
            x -= 1
            grid[x][y] += 1
            if (grid[x][y] >= 2 && second) {
                indexArray.push(x,y)
                stepArray.push(stepCount) 
            }
        }
    }
    if (currentOrder.includes("U")) {
        for(let j = 0; j < directions; j++) {
            stepCount += 1
            y += 1
            grid[x][y] += 1
            if (grid[x][y] >= 2 && second) {
                indexArray.push(x,y)
                stepArray.push(stepCount) 
            }
        }
    }
    if (currentOrder.includes("D")) {
        for(let j = 0; j < directions; j++) {      
            stepCount += 1      
            y -= 1
            grid[x][y] += 1
            if (grid[x][y] >= 2 && second) {
                indexArray.push(x,y)
                stepArray.push(stepCount) 
            }
        }
    }
    return grid
}

function getIndex(x, indexArray) {
    let savedIndexes = []
    let index = indexArray.indexOf(x)
    while(index != -1) {
        savedIndexes.push(index)
        index = indexArray.indexOf(x, index + 1)
    }
    return savedIndexes
}

function checkForMatch(positionX, indexArray) {
    let check = false
    for(let i = 0; i < positionX.length; i++) {

        let currentCheck = positionX[i]
        if  (x === indexArray[currentCheck] && 
            y === indexArray[currentCheck + 1]) {
                rightOrderForArray.push(currentCheck /2)
                check = true
        }
    }
    return check
}

let grid = []
for(let i = 0; i < 20000; i++) {
    grid[i] = []
    for(let j = 0; j < 20000; j++) {
        grid[i][j] = 0
    }
}

let second
let indexArray = []
let stepCount = 0
let stepArray = []
let x = 10000    
let y = 10000
for(let i = 0; i < firstInput.length; i++) {
    let currentOrder = firstInput[i]
    grid = executeOrder66(currentOrder, grid, indexArray, second)
}

x = 10000
y = 10000
stepCount = 0
second = true 
for(let i = 0; i < secondInput.length; i++) {
    let currentOrder = secondInput[i]
    grid = executeOrder66(currentOrder, grid, indexArray, second)
}

let resultArray = []
for(let i = 0; i < indexArray.length; i += 2){
    let result = Math.abs(10000 - indexArray[i]) + Math.abs(10000 - indexArray[i + 1])
    resultArray.push(result)
}
console.log(Math.min(...resultArray))

// ------------- Part 2 

let stepArrayFirst = []
let rightOrderForArray = []
y = 10000
x = 10000
stepCount = 0
for(let i = 0; i < firstInput.length; i++) {
    let currentOrder = firstInput[i]
    let directions = currentOrder.slice(1)
    if (currentOrder.includes("R")) {
        for(let j = 0; j < directions; j++){
            stepCount++
            x += 1 
            let positionX = getIndex(x, indexArray)
            let check = checkForMatch(positionX, indexArray)
            if  (check) {
                stepArrayFirst.push(stepCount)
            }            
        }        
    }
    if (currentOrder.includes("L")) {
        for(let j = 0; j < directions; j++){
            stepCount++
            x -= 1
            let positionX = getIndex(x, indexArray)
            let check = checkForMatch(positionX, indexArray)
            if  (check) {
                stepArrayFirst.push(stepCount)
            }            
        }        
    }
    if (currentOrder.includes("U")) {
        for(let j = 0; j < directions; j++){
            stepCount++
            y += 1
            let positionX = getIndex(x, indexArray)
            let check = checkForMatch(positionX, indexArray)
            if  (check) {
                stepArrayFirst.push(stepCount)
            }            
        }        
    }
    if (currentOrder.includes("D")) {
        for(let j = 0; j < directions; j++){
            stepCount++
            y -= 1
            let positionX = getIndex(x, indexArray)
            let check = checkForMatch(positionX, indexArray)
            if  (check) {
                stepArrayFirst.push(stepCount)
            }            
        }        
    }
}

let i = 0
let orderForArray = []
while (i < stepArray.length) { 
    let sortPosition = rightOrderForArray.indexOf(i)
    orderForArray.push(stepArrayFirst[sortPosition])
    i++
}

let outputArray = []
for(let i = 0; i < stepArrayFirst.length; i++) {
    let sum = orderForArray[i] + stepArray[i]
    outputArray.push(sum)
}

let shortestSteps = Number.MAX_SAFE_INTEGER
for(let i = 0; i < outputArray.length; i++) {
    if (outputArray[i] < shortestSteps) {
        shortestSteps = outputArray[i]
    }
}
console.log(shortestSteps)
