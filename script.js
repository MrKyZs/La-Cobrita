//Propriedades do Grid
let canvas = document.getElementById("grid");
let context = canvas.getContext("2d");
let box = 32; //Cada quadrado tem 32 pixels
let myscore= 0;

//Cria o Canvas
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Propriedades da cobra
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//Cria a Cobra
function cobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Direção inicial
let direction = "right"

//Comida randomica
let comida ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Aparecer na tela
function alimento (){
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);
}

//Muda as direções
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    else if(event.keyCode == 38 && direction != "down") direction = "up";
    else if(event.keyCode == 39 && direction != "left") direction = "right";
    else if(event.keyCode == 40 && direction != "up") direction = "down";
}


//Inicia o jogo
function inicio(){
    
    criarBG();
    cobrinha();
    alimento();
    score();

    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    //direção que a cobra ta vendo
    switch(direction){
        case "right":
            snakeX += box;
        break;
        case "left":
            snakeX -= box;
        break;
        case "up":
            snakeY -= box;
        break;
        case "down":
            snakeY += box;
        break;
    }

    //faz crescer e coloca comida dnv
    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop(); 
    }
    else{
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y =Math.floor(Math.random() * 15 + 1) * box;
        myscore++;
    }

    let newhead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newhead);

    //Ve se a cobrinha saiu da tela
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    else if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    else if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    else if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    //gameover
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Perdeu >:)");
        }
    }

    function score(){
        context.font = "16px Arial";
        context.fillStyle = "black";
        context.fillText("Score: "+ myscore, 8,20);
    }

}

let jogo = setInterval(inicio, 100);

//Botoes
function restart(){
    location.reload(true);
}
