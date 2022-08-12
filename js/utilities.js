
function fixCanvas(canvas){
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
    const cols = Math.round(width/resolution);
    const rows = Math.round(height/resolution);

    // Rendering center-left columns
    for(let i = 0; i < cols/2; i++){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo((width/2) - (resolution * i), 0);
        ctx.lineTo((width/2) - (resolution * i),height);
        ctx.closePath();
        ctx.stroke();
    }
    // Rendering center-right columns
    for(let i = 1; i < cols/2; i++){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo((width/2) + (resolution * i), 0);
        ctx.lineTo((width/2) + (resolution * i),height);
        ctx.closePath();
        ctx.stroke();
    }
    // Rendering center-top rows
    for(let i = 0; i < rows/2; i++){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(0, (height/2) - (resolution * i));
        ctx.lineTo(width, (height/2) -(resolution * i));
        ctx.closePath();
        ctx.stroke();
    }
    // Rendering center-bottom rows
    for(let i = 1; i < rows/2; i++){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(0, (height/2) + (resolution * i));
        ctx.lineTo(width, (height/2) + (resolution * i));
        ctx.closePath();
        ctx.stroke();
    }
}
