// defining Variables &  constants
const gameOverSound = new Audio('gameOver.wav');
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
let direction = { x: 0, y: 0 };

let speed = 5;
let score = 0;
let lastTime = 0;
let snakeArray = [
    { x: 16, y: 16 }
];

food = { x: 5, y: 5 };

// Game Functions
function repeatativeFunction(ctime) {
    window.requestAnimationFrame(repeatativeFunction);

    if ((ctime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = ctime;
    gameFunction();
}

function isCollide(snake) {
    // If snake collides with itself 
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If snake collides with the wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameFunction() {

    if (isCollide(snakeArray)) {
        gameOverSound.play();

        direction = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArray = [{ x: 16, y: 16 }];
        musicSound.play();
        score = 0;
    }

    // If snake has eaten the food, increment the score,increment the speed in logarithmic way and regenerate the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score += 1;
        speed = 5 + Math.log(score);

        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y });
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = {...snakeArray[i] };
    }

    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;

    //  Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// main logic 
alert("press upkey/downkey/rightkey/leftkey to start the game");
window.requestAnimationFrame(repeatativeFunction);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 } // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }

});
