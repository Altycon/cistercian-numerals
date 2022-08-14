
const MENU_OPEN_BUTTON = document.querySelector('.js-menu-btn'),
MENU_CLOSE_BUTTON = document.querySelector('.js-close-menu-btn'),
INPUT_NUMBER_BUTTON = document.querySelector('.js-input-btn'),
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

const closeInputMenu = (ev)=>{
    document.querySelector('.js-num-input-ctn').classList.remove('open');
}
const openInputContainer = (ev)=>{
    document.querySelector('.js-num-input-ctn').classList.add('open');
    let numberInputs = [];

    document.querySelectorAll('[data-button]').forEach( btn => {
        btn.addEventListener('click', (ev)=>{
            if(numberInputs.length > 3) return;

            const ButtonValue = ev.target.dataset.button;
            if(ButtonValue === "0" && numberInputs.length === 0) return;

            numberInputs.push(ButtonValue)
            
            const newNumber = numberInputs.join('');

            fixCanvas(CISTERCIAN_CANVAS)
            CistercianNumber = Number(newNumber);

            DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
            const CN = new Cistercian(CistercianNumber,Resolution,'yellow');
            CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
            drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
            CN.render(CC_CTX);
        })
    });
    document.querySelector('[data-clear]').addEventListener('click', (ev)=>{
        numberInputs = [];
        fixCanvas(CISTERCIAN_CANVAS)
        CistercianNumber = 0;

        DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
        const CN = new Cistercian(CistercianNumber,Resolution,'limegreen');
        CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
        drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
        CN.render(CC_CTX);
    });
    document.querySelector('[data-backspace]').addEventListener('click', (ev)=>{
        numberInputs.pop();
        const newNumber = numberInputs.join('');

        fixCanvas(CISTERCIAN_CANVAS)
        CistercianNumber = Number(newNumber);

        DECIMAL_DISPLAY.innerText = CistercianNumber.toString();
        const CN = new Cistercian(CistercianNumber,Resolution,'limegreen');
        CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
        drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
        CN.render(CC_CTX);
    })
    document.querySelector('[data-close]').addEventListener('click', closeInputMenu)
}

const increaseCistercianNumber = (ev)=>{
    if(CistercianNumber < 10000){
        fixCanvas(CISTERCIAN_CANVAS)
        CistercianNumber++;
        
        if(CistercianNumber > 9999) CistercianNumber = 9999;
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
        const CN = new Cistercian(CistercianNumber,Resolution,'cornflowerblue');
        CC_CTX.clearRect(0,0, CC_WIDTH, CC_HEIGHT);
        drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
        CN.render(CC_CTX);
        
    }
    
}

const init = ()=>{

    MENU_OPEN_BUTTON.addEventListener('click', openMenu)
    INPUT_NUMBER_BUTTON.addEventListener('click', openInputContainer);

    INCREMENT_NUMBER_BUTTON.addEventListener('click', increaseCistercianNumber);
    DECREMENT_NUMBER_BUTTON.addEventListener('click', decreaseCistercianNumber);
}



const startCistercianDisplay = ()=>{
    fixCanvas(CISTERCIAN_CANVAS)
    drawGrid(CC_CTX, Resolution,'hsl(0 0% 40% / 0.3)')
   
    const CISTERCIAN_NUMBER = new Cistercian(CistercianNumber,Resolution);
    CISTERCIAN_NUMBER.render(CC_CTX);  
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', startCistercianDisplay)