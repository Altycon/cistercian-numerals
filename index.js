
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
const Resolution = 40;

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
        CistercianNumber++;
        INPUT_NUMBER.value = CistercianNumber;
        DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
        const CN = new Cistercian(CistercianNumber,Resolution);
        CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
        CN.render(CC_CTX);
        drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
    }
}
const decreaseCistercianNumber = (ev)=>{
    if(CistercianNumber > 0){
        CistercianNumber--;
        DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
        INPUT_NUMBER.value = CistercianNumber;
        const CN = new Cistercian(CistercianNumber,Resolution);
        CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
        CN.render(CC_CTX);
        drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
    }
    
}
const displayInputNumber = (ev)=>{
    CistercianNumber = Number(ev.target.value);
    DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
    const CN = new Cistercian(CistercianNumber,Resolution);
    CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
    CN.render(CC_CTX);
    //drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
}
const init = ()=>{

    

    MENU_OPEN_BUTTON.addEventListener('click', openMenu)
    INPUT_NUMBER_BUTTON.addEventListener('click', openInputContainer);

    INCREMENT_NUMBER_BUTTON.addEventListener('click', increaseCistercianNumber);
    DECREMENT_NUMBER_BUTTON.addEventListener('click', decreaseCistercianNumber);
    INPUT_NUMBER.addEventListener('input', displayInputNumber)
}



const startCistercianDisplay = ()=>{
    drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
   
    const CISTERCIAN_NUMBER = new Cistercian(CistercianNumber,Resolution);
    //CISTERCIAN_NUMBER.print();

    //CC_CTX.translate(CC_WIDTH/2, CC_HEIGHT/2);
    CISTERCIAN_NUMBER.render(CC_CTX);

    
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', startCistercianDisplay)