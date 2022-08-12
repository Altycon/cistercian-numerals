
const fixCanvas =(canvas)=>{
    if(!canvas){
        throw new Error('Html canvas element missing from function')
    }
    if(canvas.nodeName != 'CANVAS'){
        throw new Error('Argument must be a HTML canvas element')
    }
    const dpi = devicePixelRatio;
    const style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
    const style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
    canvas.setAttribute('width', style_width * dpi)
    canvas.setAttribute('height', style_height * dpi);
}

const drawGrid = (ctx,resolution,color)=>{
    if(!ctx){
        throw new Error('Missing first argument')
    }
    if(!color){
        color = getComputedStyle(document.body).getPropertyValue('color');
    }
    
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const drawColumns = (start,end)=>{
        ctx.save()
        ctx.translate(width/2,height/2);
        for(let i = start; i < end; i++){
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo((resolution * i), -height/2);
            ctx.lineTo((resolution * i), height);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    }
    const drawRows = (start,end)=>{
        ctx.save()
        ctx.translate(width/2,height/2);
        for(let i = start; i < end; i++){
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo(-width/2, (resolution * i));
            ctx.lineTo(width/2, (resolution * i));
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    }
    drawColumns(0,width/2);
    drawColumns(-width/2, 0);
    drawRows(0, height/2);
    drawRows(-height/2,0);
}
