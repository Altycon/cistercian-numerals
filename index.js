
const MENU_OPEN_BUTTON = document.querySelector('.js-menu-btn'),
MENU_CLOSE_BUTTON = document.querySelector('.js-close-menu-btn'),
INPUT_NUMBER_BUTTON = document.querySelector('.js-input-btn'),
INPUT_NUMBER = document.querySelector('#NumInput'),
DECREMENT_NUMBER_BUTTON = document.querySelector('.js-decrement-btn'),
INCREMENT_NUMBER_BUTTON = document.querySelector('.js-increment-btn'),
DECIMAL_DISPLAY = document.querySelector('#DecimalDisplay');

const CISTERCIAN_CANVAS = document.getElementById('Canvas1');
fixCanvas(CISTERCIAN_CANVAS)

const CC_WIDTH = CISTERCIAN_CANVAS.width,
CC_HEIGHT = CISTERCIAN_CANVAS.height,
CC_CTX = CISTERCIAN_CANVAS.getContext('2d');

const dpi = devicePixelRatio;
let CistercianNumber = 0;
const Resolution = dpi > 1 ? 10*dpi:40;

const closeMenu = (ev)=>{
    document.querySelector('.js-c-calc__menu').classList.remove('open');
    ev.target.removeEventListener('click',closeMenu);
}

const openMenu = (ev)=>{
    document.querySelector('.js-c-calc__menu').classList.add('open');

    MENU_CLOSE_BUTTON.addEventListener('click', closeMenu);
}

const openInputContainer = (ev)=>{
    document.querySelector('.js-num-input-ctn').classList.toggle('open');


}

const increaseCistercianNumber = (ev)=>{
    if(CistercianNumber < 10000){
        fixCanvas(CISTERCIAN_CANVAS)
        CistercianNumber++;
        
        if(CistercianNumber > 9999) CistercianNumber = 9999;
        INPUT_NUMBER.value = CistercianNumber;
        DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
        const CN = new Cistercian(CistercianNumber,Resolution,'limegreen');
        CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
        drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
        CN.render(CC_CTX);
    }
}
const decreaseCistercianNumber = (ev)=>{
    if(CistercianNumber > 0){
        fixCanvas(CISTERCIAN_CANVAS)
        CistercianNumber--;
        if(CistercianNumber < 0) CistercianNumber = 0;
        DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
        INPUT_NUMBER.value = CistercianNumber;
        const CN = new Cistercian(CistercianNumber,Resolution,'cornflowerblue');
        CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
        drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
        CN.render(CC_CTX);
        
    }
    
}
const displayInputNumber = (ev)=>{
    fixCanvas(CISTERCIAN_CANVAS)
    if(ev.target.value < 0) ev.target.value = 0;
    if(ev.target.value > 9999) ev.target.value = 9999;
    CistercianNumber = Number(ev.target.value);
    DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
    const CN = new Cistercian(CistercianNumber,Resolution,'yellow');
    CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
    drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
    CN.render(CC_CTX);
}
const init = ()=>{

    

    MENU_OPEN_BUTTON.addEventListener('click', openMenu)
    INPUT_NUMBER_BUTTON.addEventListener('click', openInputContainer);

    INCREMENT_NUMBER_BUTTON.addEventListener('click', increaseCistercianNumber);
    DECREMENT_NUMBER_BUTTON.addEventListener('click', decreaseCistercianNumber);
    INPUT_NUMBER.addEventListener('input', displayInputNumber)
}



const startCistercianDisplay = ()=>{
    fixCanvas(CISTERCIAN_CANVAS)
    drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
   
    const CISTERCIAN_NUMBER = new Cistercian(CistercianNumber,Resolution);
    CISTERCIAN_NUMBER.render(CC_CTX);  
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', startCistercianDisplay)