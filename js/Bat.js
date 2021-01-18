class Bat extends GameObject
{

    constructor(image,x, y, width)
    {
        super(null); 

        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 15;
    }

    render()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    changeX(changeAmount)
    {
        this.x += changeAmount;
        
        if(this.x > canvas.width - (this.width))
        {
            this.x = canvas.width - (this.width);
        }
        else if(this.x < 0)
        {
            this.x = 0;
        }
    }
    
    getWidth()
    {
        return this.width;
    }
    
    setWidth(newWidth)
    {
        this.width = newWidth;
    }

    getCentreX()
    {
        return this.x + this.width / 2;
    }
}