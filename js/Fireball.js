class Fireball extends GameObject
{
    constructor(image, centreX)
    {
        super(5); 

        this.image = image;
        this.width = 22;
        this.height = this.width
        this.centreX = centreX;
        this.centreY = canvas.height - this.height-1;
        this.dx = 1.8;
        this.dy = -1.6;
        this.stepSize = -1;
        this.dsp = 1;
       
    }
    
    updateState()
    {
        this.centreX += this.dx;
        this.centreY += this.dy;

        if (this.dx < 0) this.direction = 0; 
        else this.direction = 1;

        if (this.dy < 0) this.directionY = 0;
        else this.directionY = 1;
    }

    render()
    {
        ctx.drawImage(this.image, this.centreX - this.width / 2, this.centreY - this.height / 2, this.width, this.height);  
    }
}