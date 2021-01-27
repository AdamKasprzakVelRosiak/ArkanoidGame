                                                                          
class ArkanoidCanvasGame extends CanvasGame
{
    constructor()
    {
        super();
        this.brickRowCount = 10;
        this.brickColumnCount = 6;
        this.brickWidth = (canvas.width)/6;
        this.brickHeight = 30;
        this.brickPadding = 0;
        this.brickOffsetTop = canvas.height/16;
        this.brickOffsetLeft = 0;
        this.bricks = [];
        this.brickCounter = 60;
        
        this.randomDirection = 0;
        this.cup = false;

        this.scoreCounter = 0;
        this.level = 1;
        this.life = 2;
        
        this.targetBricks = this.createBricks(this.level);
        this.indexToDelete = 0;

    }
    createBricks(level)
    {
        // this.life = new Target(life, 20,500,20);
        for(var c=0; c<this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for(var r=0; r<this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, dsp: 1, type:1 };
            }
        }
        for(var c=0; c<this.brickColumnCount; c++) {
            for(var r=0; r<this.brickRowCount; r++) {
                var brickX = (c*(this.brickWidth))+this.brickOffsetLeft;
                var brickY = (r*(this.brickHeight))+this.brickOffsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
// LEVEL 1
                if(level == 1){
// BONUS BLOCK
                    if (r == 3 && (c == 4 || c == 1)){
                        target = new Target(bonusBlockImage, brickX, brickY, this.brickWidth, 1, 3);
                        }
// RED BLOCK
                    else if (r == 2 && (c > 0 && c < 5)){
                         target = new Target(redBlockImage, brickX, brickY, this.brickWidth, 1, 2);;   
                        }
// GRAY BLOCK
                        else {
                            target = new Target(logImage, brickX, brickY, this.brickWidth, 1, 1);   
                        }
                        targetBricks.push(target);
                         }
// LEVEL 2
                if(level == 2){
// BONUS BLOCK               
                        if (r == 1 && (c == 1 || c == 4) || r == 7 && (c == 1 || c == 4)){
                            target = new Target(bonusBlockImage, brickX, brickY, this.brickWidth, 1, 3);  
                        }
// RED BLOCK
                        else if ((r == 4 && c > 0 && c < 5) || (r == 3 && c > 1 && c < 4)){
                            target = new Target(redBlockImage, brickX, brickY, this.brickWidth, 1, 2);   
                        }
// GRAY BLOCK
                        else {
                            target = new Target(logImage, brickX, brickY, this.brickWidth, 1, 1);   
                        }
                        targetBricks.push(target);
                         } 
// LEVEL 3
                if(level == 3){
// BONUS BLOCK               
                        if ((r == 0 && (c == 0 || c == 5)) || (r == 9) && (c == 0 || c == 5)){
                            target = new Target(bonusBlockImage, brickX, brickY, this.brickWidth, 1, 3);  
                        }
// RED BLOCK
                        else if ((r >1 && r < 7 && r % 2 == 0) && c > 0 && c < 5){
                            target = new Target(redBlockImage, brickX, brickY, this.brickWidth, 1, 2);   
                        }
// GRAY BLOCK
                        else {
                            target = new Target(logImage, brickX, brickY, this.brickWidth, 1, 1);   
                        }
                        targetBricks.push(target);
                         }           
            }
        }    
        return targetBricks;     
    }
    collisionDetection()
    {
        // canva boki

         if(ball.centreX + ball.dx > canvas.width - ball.width/2 || ball.centreX + ball.dx < ball.width/2) {
            ball.dx = -(ball.dx);
        }
        // GÓRA 
        if(ball.centreY + ball.dy < ball.height/2 + canvas.height/16) {
            ball.dy = -(ball.dy);
        }
        // RAKIETA
        else if(ball.centreY + ball.dy > canvas.height-ball.width/2-10) {
            if(ball.centreX > bat.x && ball.centreX < bat.x + canvas.width/4) {
                // if (ball.centreY = ball.centreY - (bat.height)) {    //////////////!
                    ball.dy = -(ball.dy);
                    this.randomDirection = Math.floor(Math.random() * (7));

                    if(ball.dx>0){
                        ball.centreX += this.randomDirection;
                    }
                    else {
                        ball.centreX += -(this.randomDirection);
                    }            
            }
            else if (ball.centreY + ball.dy > canvas.height-ball.width/2)
            {
                this.life--;
               
                if (this.life == -1){
                    gameObjects[3] =  new StaticText("Game Over!", STATIC_TEXT_CENTRE, canvas.height/2+70, "Roboto", canvas.width/13, "white");
                    gameObjects[3].start();
                    

                    //SAVE THE BEST SCORE
                    if(this.scoreCounter > recordScore)
                    {
                        score.set(this.scoreCounter);
                        gameObjects[4] =  new StaticText("You break a record!", STATIC_TEXT_CENTRE, canvas.height/2+120, "Roboto", canvas.width/13, "white");
                        gameObjects[4].start();
                        this.cup = true;
                    }

                    for (let i = 0 ;i<3 ;i++)
                    {
                        gameObjects[i].stop();
                    }
                    this.life = 0;
                }
                else {
                    ball.stop();
                    setTimeout(this.lifeReload,1200);
                    bat.x = canvas.width/2 - canvas.width/8;
                    ball.centreX =  bat.getCentreX();         
                    ball.centreY = canvas.height - 2*ball.height;
                    ball.centreX = bat.getCentreX();
                }  
                ball.dy = -(ball.dy);
            }
        }    
        // BRICK COLLISION

        for(var c=0; c<this.brickColumnCount; c++) {
            for(var r=0; r<this.brickRowCount; r++) {
                var b = this.bricks[c][r];
               
                // Kolizja 
            if (ball.centreX+ball.width/2 > b.x && ball.centreX-ball.width/2 < b.x+this.brickWidth 
                && ball.centreY-ball.height/2 < b.y+this.brickHeight 
                && ball.centreY+ball.height/2 > b.y)
                {                        
                    this.indexToDelete = c * this.brickRowCount + r;
                    
                    this.scoreCounter+=10*this.level;
                    
                    if (this.targetBricks[this.indexToDelete].type == 3){
                        bat.width*=1.1;
                     }
                     else if (this.targetBricks[this.indexToDelete].type == 2)
                     {
                         if (bat.width < 20){
                             console.log(ball.dx);
                             console.log(ball.dy);
                             
                             if(ball.dx > 0) ball.dx += 0.1;
                             else if (ball.dx < 0)ball.dx -= 0.1;
                             if(ball.dy > 0) ball.dy += 0.1;
                             else if (ball.dy < 0)ball.dy -= 0.1;
                             
                         }
                         else {
                            bat.width*=0.9;
                                
                            if(ball.dx > 0) ball.dx += 0.1;
                            else if (ball.dx < 0)ball.dx -= 0.1;
                            if(ball.dy > 0) ball.dy += 0.1;
                            else if (ball.dy < 0)ball.dy -= 0.1;   
                         } 
                     }
                    // To not display
                    this.targetBricks[this.indexToDelete].dsp = 0;
                    this.cutBricks(this.indexToDelete);
                                 
                // DÓŁ 
                if(ball.centreX > b.x && ball.centreX < b.x+this.brickWidth && ball.centreY-ball.height/2 < b.y+this.brickHeight && ball.centreY-ball.height/2 < b.y+this.brickHeight )
                {      
                         ball.dy = -(ball.dy);
                         b.x = canvas.width*3;
                         this.brickCounter--;
                         return;                        
                }
                // PRAWA
                else if (ball.centreX-ball.width/2 + ball.dx <= b.x+this.brickWidth && ball.centreX-ball.width/2  >= b.x+this.brickWidth-ball.dx && (ball.centreY >= b.y && ball.centreY
                <= b.y+this.brickHeight)){ 
                    ball.dx = -(ball.dx);
                    
                    b.x = canvas.width*3;
                    this.brickCounter--;
                    return;
                }
                // LEWA
                else if (ball.centreX+ball.width/2 + ball.dx >= b.x && ball.centreX+ball.width/2 <= b.x+b && (ball.centreY > b.y 
                    && ball.centreY < b.y+this.brickHeight)){ 
                        ball.dx = -(ball.dx);
                        
                        b.x = canvas.width*3;
                        this.brickCounter--;
                        return;
                    }
                else if (ball.centreX+ball.width/2 + ball.dx >= b.x && ball.centreX+ball.width/2 <= b.x && (ball.centreY > b.y 
                    && ball.centreY < b.y+this.brickHeight)){
                        ball.dx = -(ball.dx);
                        b.x = canvas.width*3;
                        this.brickCounter--;
                        return;
                    }                                   
                else if(ball.centreX+ball.dx-ball.width/2 <= b.x+this.brickWidth)
                {
                    if(ball.centreY-ball.width/2 <= b.y+this.brickHeight && ball.centreY-ball.width/2 >= b.y)
                    {
                    ball.dx = -(ball.dx);
                    
                    b.x = canvas.width*3;
                    this.brickCounter--;
                    return;
                    }   
                }  
                }        
            }
        }    
        if (this.brickCounter == 0){
         
            ball.stop();

            if (this.level == 3){

                 //SAVE THE BEST SCORE
                 if(this.scoreCounter > recordScore)
                 {
                     score.set(this.scoreCounter);
                 }
                gameObjects[3] =  new StaticText("You win the game!", STATIC_TEXT_CENTRE, canvas.height/2+70, "Roboto", canvas.width/15, "white");
                gameObjects[3].start();
                gameObjects[4] =  new StaticText("You break a record!", STATIC_TEXT_CENTRE, canvas.height/2+140, "Roboto", canvas.width/13, "white");
                gameObjects[4].start();
                this.cup = true;
            }
            else {
                gameObjects[3] =  new StaticText("Level completed!", STATIC_TEXT_CENTRE, canvas.height/2+150, "Roboto", canvas.width/15, "white");
                gameObjects[3].start();
                setTimeout(this.levelLoader,2000);
                
                this.level++;
                this.bricks = [];
                this.targetBricks.splice(0,targetBricks.length);
                this.targetBricks = this.createBricks(this.level);
                
                ball.centreX =  bat.getCentreX();
                ball.dy+= 0.5;
                ball.dx+= 0.5;
        
                bat.width = canvas.width/4;
                bat.x = canvas.width/2 - canvas.width/8;
                
                ball.centreY = canvas.height - 2*ball.height;
                ball.centreX = bat.getCentreX();
                
                this.brickCounter = 60;
            }
        }
    }
    cutBricks(index)
    {
        const brick = this.targetBricks[index];

        if (brick.height <= 0){
            brick.dsp = 0; 
            brick.width = 0; 
            return;
        }
        setInterval(cut,80);

        function cut(){
            if(brick.height > 0){
                brick.height-=3;  
            }
            else brick.width = 0; 
        }
    }
    levelLoader()
       {     
        ball.start();
        gameObjects.splice(3,1);  
       }
    lifeReload()
    {
    ball.start();

    }
    render()
    {
        super.render();
        bat.render();

        if (this.cup == true)pch.render();
        
        targetBricks.forEach(target => {

        if (target.dsp == 1)target.render()});
       
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, canvas.width, canvas.height/16);

        //SCORES
        ctx.font = "26px Roboto";
        ctx.fillStyle = "white";
        ctx.fontWeight = "bold";
        ctx.fillText("Scores: ", 8, canvas.height/19);

        // AMOUNT SCORE
        ctx.font = "28px DIGITAl";
        ctx.fillStyle = "yellow";
        ctx.fillText(this.scoreCounter, 100, canvas.height/19);

        //LEVEL
        ctx.font = "26px Roboto";
        ctx.fillStyle = "white";
        ctx.fillText("Level: ", 160, canvas.height/19);

        //LEVEL NUMBER
        ctx.font = "28px DIGITAl";
        ctx.fillStyle = "yellow";
        ctx.fillText(this.level, 235, canvas.height/19);

        //TOP SCORES
        ctx.font = "26px Roboto";
        ctx.fillStyle = "white";
        ctx.fillText("Top: ", 360, canvas.height/19);

        // AMOUNT TOP
        ctx.font = "28px DIGITAl";
        ctx.fillStyle = "yellow";
        // ctx.fillText(recordScore, 420, canvas.height/19);

        if (this.scoreCounter > recordScore){
            ctx.fillText(this.scoreCounter, 420, canvas.height/19);
        }
        else {
            ctx.fillText(recordScore, 420, canvas.height/19);
        }
        
        
        //LEVEL
        if (this.life > -1) {
            ctx.font = "28px DIGITAl";
            ctx.fillStyle = "yellow";
            ctx.fillText(this.life, 308, canvas.height/19);
        }
        life.render();
        
    }
}