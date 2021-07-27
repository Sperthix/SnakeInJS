const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const showScore = document.querySelector('.score');
const finalMessage = document.querySelector('h1');

const snakeSize = 30;
let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height/2;

let chvost = [];

let velkostX = canvas.width / snakeSize;
let velkostY = canvas.height / snakeSize;

let smerX = 0;
let smerY = 0;

let foodPosX = 0;
let foodPosY = 0;

let score = 0;
let gameIsRunning = true;


document.addEventListener('keydown', smer);


function gameloop() {

    if(gameIsRunning){
        kontrola();
        zapisHada();
        render();
        pohyb();
        setTimeout(gameloop, 1000 / 15);
        // requestAnimationFrame(gameloop);
    }
}

function kontrola(){
    kontrolaOkraju();
    kontrolaScorovania();
    kontrolaKoncaHry();
}

function kontrolaOkraju(){
    if(snakePosX >= canvas.width) snakePosX = 0; 
    if(snakePosX <= 0-snakeSize) snakePosX = canvas.width;
    if(snakePosY >= canvas.height) snakePosY = 0;
    if(snakePosY <= 0-snakeSize) snakePosY = canvas.height;
}

function kontrolaScorovania(){
    if ((snakePosX === foodPosX) && (snakePosY === foodPosY)){
        score++;
        randomSpot();
        showScore.textContent = score;
    }
}

function kontrolaKoncaHry(){
    chvost.forEach((castChvosta) => {
        if (score > 1){
            if (snakePosX === castChvosta.x && snakePosY === castChvosta.y){
                gameIsRunning = false;
                finalMessage.textContent = `Dosiahol si skore: ${score}!`;
            }
        }
        
    })
}


function smer(event){
    // console.log(event.key);
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
            /*Z tohto chcem urobit pauzu*/
        case 'Escape':
            smerX = 0;
            smerY = 0;
            if(gameIsRunning)gameIsRunning = false;
            else{
                gameIsRunning = true;
                gameloop();
            }
            break;
            //reset hry
        case 'Enter':
            if (! gameIsRunning) location.reload();  
    }
}

function pohyb(){
    snakePosX+= snakeSpeed * smerX;
    snakePosY+= snakeSpeed * smerY;
}

function zapisHada() {
    chvost.push({x: snakePosX, y: snakePosY});
    chvost = chvost.slice(-1 * score);
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
    if (score > 1){
        chvost.forEach(part => {
            rectangle('#4D4949' , part.x, part.y, snakeSize, snakeSize);
        });
    }
    rectangle('black', snakePosX, snakePosY, snakeSize, snakeSize);
}


//generacia pozicie pre jedlo
function randomSpot(){
    let x = Math.floor(Math.random() * velkostX) * snakeSize;
    let y = Math.floor(Math.random() * velkostY) * snakeSize;
    console.log(x, y);
    if (chvost.length > 0)
    {
        chvost.forEach(cast => {
            if (cast.x === x && cast.y === y) randomSpot();
            else{
                foodPosX = x;
                foodPosY = y;
            }
        })
    }
    else{
        foodPosX = x;
        foodPosY = y;
    }
}

randomSpot();
render();
gameloop();