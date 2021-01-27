
class Target extends GameObject
{
    constructor(image, x, y, width, dsp, type)
    {
        super(null); 

        // 0 - wall / 1 - gray / 2 - red / 3 - green
        
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 30;
        this.minimumSize = 10; 
        this.dsp = dsp;
        this.type = type;
        this.delete = 0;
    }

    render()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}