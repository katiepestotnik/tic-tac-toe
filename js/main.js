// 1) Define required constants
// 2) Define required variables used to track the state of the game
// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
// 4) Upon loading the app should:
//     4.1) Initialize the state variables
//     4.2) Render those values to the page
//     4.3) Wait for the user to click a square
// 5) Handle a player clicking a square
// 6) Handle a player clicking the replay button

/*----- constants -----*/
//player 1 x and player 2 o 
//winning combinations
/*----- app's state (variables) -----*/
// where the users click and save the variable(where to place x or o) - make sure square is empty

//which players turn is it
//when we have a winner or tie - reset board

/*----- cached element references -----*/
//game board squares
//reset button
//message container
/*----- event listeners -----*/
//click on squares
//click on reset
//optional user starts game
/*----- functions -----*/
//initalizing game function
//handle user interactions
//check for winner (main game logic)
//render messages to the dom


/*------bonus -----*/
//add score for games won
//quit
//timer for turn
//const variables 
const players = {
    '1': 'X',
    '-1': 'O',
}
//winning combinations matrix pattern with array of arrays 012, 345, 678, 036, 147, 258, 048, etc one direction is fine, doesn't need to go back and forth
012
345
678

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]  
]
//state variables
let board; //variable that stores board positions
let turn; //determine player x || o
let winner; // can be three things x || o || tie || null
// cached element references that user interact with
const message = document.querySelector(".message")
const squares = document.querySelectorAll(".square")
const reset = document.querySelector(".butt")
const gameBoard = document.querySelector(".game-board")

//functions

const init = (event) => {
    //use state variables
    //array keeps track of player moves
    console.log("game initialized")
    board = new Array(9).fill(null) //[null, *9]
    turn = 1 //x goes first
    winner = null //no winner at beginning
}
const handleMove = (event) => {
    //square number uses data-square="value"
    const squareNumer = parseInt(event.target.dataset.square)
    console.log(`${squareNumer}`)
    //know the spot has been claimed
    if (board[squareNumer] || winner) {
        return
    }
    board[squareNumer] = turn
    //toggle turn 
    turn *= -1
    //check winner
    winner = winnerCheck()
    //render message to user
    render()
}
const winnerCheck = () => {
    for (let index in winningCombos) {
        if (board[winningCombos[index][0]] === turn &&
            board[winningCombos[index][1]] === turn &&
            board[winningCombos[index][2]] === turn) {
             return turn
            }
    }
    if (board.includes(null)) {
        return null
    }
    return 'tie'
    }

const render = () => {
    console.log('render')
    //loop over board puts an x or o on the board 
    board.forEach((element, index) => {
        squares[index].textContent = players[element]
    })
}
//starts the game on load
init()
winnerCheck()
render()
//event listeners
//delegate to square through class of game board
gameBoard.addEventListener("click", handleMove)
reset.addEventListener("click", init)
