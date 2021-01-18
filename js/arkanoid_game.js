let backgroundImage = new Image();
backgroundImage.src = "images/bcgBiggerCosmos.jpg";

let logImage = new Image();
logImage.src = "images/block.png";

let redBlockImage = new Image();
redBlockImage.src = "images/redBlock.png"

let bonusBlockImage = new Image();
bonusBlockImage.src = "images/bonusBlock.png"

let batImage = new Image();
batImage.src = "images/paddle.png";

let fireballImage = new Image();
fireballImage.src = "images/fireball.png";

let life = new Image();
life.src = "images/heart.png";

let puchar = new Image();
puchar.src = "images/puchar.png";

const BACKGROUND = 0;
const WIN_LOSE_MESSAGE = 1;

/* Instead of using gameObject[], we can declare our own gameObject variables */
let bat = null; // we cannot initialise gameObjects yet, as they might require images that have not yet loaded
let target = null;
let targetTable = [];
let targetBricks = [];
let scores = 0;
let ball;
var recordScore ='';

function playGame()
{   

    gameObjects[0] = new ScrollingBackgroundImage(backgroundImage, 20);
    bat = new Bat(batImage, canvas.width/2 - canvas.width/8, canvas.height - 10, canvas.width/4);
    gameObjects[2] = bat;

    ball = new Fireball(fireballImage, bat.getCentreX());
    gameObjects[1] = ball;

    life = new Target(life,280,20 ,22)
    life.height = 18;

    pch = new Target(puchar,canvas.width/2 - 75, 480, 150);
    pch.height = 150;
   
        let game = new ArkanoidCanvasGame();
        game.start();
        
        document.addEventListener("keydown", function (e)
        {
            var stepSize = 25;

            if (e.keyCode === 37)  // left
            {
                bat.changeX(-stepSize);
            }
            else if (e.keyCode === 39) // right
            {
                bat.changeX(stepSize);
            }
    });
}