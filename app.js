const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const showScore = document.querySelector('.score');

const snakeSize = 30;
let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height/2;

let velkostX = canvas.width / snakeSize;
let velkostY = canvas.height / snakeSize;

let smerX = 0;
let smerY = 0;

let foodPosX = 0;
let foodPosY = 0;

let score = 0;


document.addEventListener('keydown', smer)


function gameloop() {
    //kontrola okraju
    if(snakePosX >= canvas.width) snakePosX = 0; 
    if(snakePosX <= 0-snakeSize) snakePosX = canvas.width;
    if(snakePosY >= canvas.height) snakePosY = 0;
    if(snakePosY <= 0-snakeSize) snakePosY = canvas.height;

    //kontrola papania
    if ((snakePosX === foodPosX) && (snakePosY === foodPosY)){
        score++;
        randomSpot();
        showScore.textContent = score;
    }

    render();
    pohyb();
    setTimeout(gameloop, 1000 / 15);
    // requestAnimationFrame(gameloop);
}

function smer(event){
    // alert(event.key);
    switch(event.key){
        case 'ArrowUp':
            if(smerY != 1){
                smerX = 0;
                smerY = -1;
            }
            break;
        case 'ArrowDown':
            if(smerY != -1){
                smerX = 0;
                smerY = 1;
            }
            break;
        case 'ArrowRight':
            if(smerX != -1){
                smerX = 1;
                smerY = 0;
            }
            break;
        case 'ArrowLeft':
            if(smerX != 1){
                smerX = -1;
                smerY = 0;
            }
            break;
        case 'Escape':
            smerX = 0;
            smerY = 0;
            break;   
    }
}

function pohyb(){
    snakePosX+= snakeSpeed * smerX;
    snakePosY+= snakeSpeed * smerY;
}


//funkcie k vykreslovaniu

//render
function render() {
    mriezka();
    snake();
    rectangle('red', foodPosX, foodPosY, snakeSize, snakeSize);
}

//nakresli stvorcek
function rectangle(color, x, y, width, height){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}


//mriezka - pozadie
function mriezka(){
    rectangle('black', 0, 0, canvas.width, canvas.height);
    for(i=0; i<velkostX; i++){
        for (j=0; j<velkostY; j++){
            rectangle('white', snakeSize*i, snakeSize*j, snakeSize-1, snakeSize-1);
        }
    }
}


//vykreslenie hadika
function snake(){
    rectangle('black', snakePosX, snakePosY, snakeSize, snakeSize);
}


//generacia pozicie pre jedlo
function randomSpot(){
    foodPosX = Math.floor(Math.random() * velkostX) * snakeSize;
    foodPosY = Math.floor(Math.random() * velkostY) * snakeSize;
}


randomSpot();
render();
gameloop();