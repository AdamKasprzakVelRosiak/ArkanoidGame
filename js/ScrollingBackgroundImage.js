
class ScrollingBackgroundImage extends GameObject
{
    constructor(image, updateStateMilliseconds)
    {
        super(updateStateMilliseconds); 

        this.image = image;

        this.y = 0;
    }

    updateState()
    {   
        this.y--;
        if (this.y <= -canvas.height)
        {
            this.y = 0;
        }
    }

    render()
    {
        ctx.drawImage(this.image, 0, this.y, canvas.width, canvas.height);
        ctx.drawImage(this.image, 0, this.y + canvas.height, canvas.width, canvas.height);
    }
}
