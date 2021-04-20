'use strict'


var gElCanvas;
var gCtx;

function onInit() {
    renderGallery();
}

function renderGallery() {
    let imgs = getImgs();
    let strHTML = imgs.map(function (img) {
        return `
            <img src="./img/meme-imgs-square/${img.id}.jpg" alt="meme-img" onclick="onOpenEditBox(${img.id})">
        `
    })
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function onOpenEditBox(imgIdx) {
    updateCurrImg(imgIdx);
    document.querySelector('.main-edit-box').classList.toggle('hidden');
    document.querySelector('.main-gallery').classList.toggle('hidden');
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    renderCanvas();
    renderEditBtns();
    addListeners();
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    let meme = getMeme();
    let currImg = meme.selectedImgId;
    let lines = meme.lines;
    addImg(currImg);
    lines.forEach((line, idx) => {
        drawText(line.color, line.size, line.font, line.align, line.txt, line.x, line.y, idx === meme.selectedLineIdx);
    });
}

function renderEditBtns() {
    let btns = getEditBtns();
    let strHTML = btns.map(function (btn) {
        return `
        <input type="image" src="./img/edit-buttons/${btn}.png" alt="${btn}" class="${btn}-btn" onclick="onClickEditBtn('${btn}')">
        `
    })
    document.querySelector('.set-text').innerHTML = strHTML.join('');
}

function addImg(imgIdx) {
    const elImg = new Image();
    elImg.src = `./img/meme-imgs-square/${imgIdx}.jpg`;
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function addListeners() {
    addInputListeners();
    // addMouseListeners();
    // addTouchListeners();
    // window.addEventListener('resize', () => {
    //     resizeCanvas();
    //     renderCanvas();
    // })
}

function updateTextInput(ev) {
    let text = ev.target.value;
    updateText(text);
    renderCanvas();
}

function onClickEditBtn(btn) {
    editText(btn);
    renderCanvas();
}

function onAddLine() {
    addLine();
    document.querySelector('#meme-text').value = 'Text Here';
    renderCanvas();
}

function onChangeLine() {
    let currTxt = changeLine();
    document.querySelector('#meme-text').value = currTxt;
    renderCanvas();
}

function onMoveLine(move) {
    updateTextPosition(+move);
    renderCanvas();
}

function onRemoveLine() {
    removeLine();
}

function onCloseEditor() {
    document.querySelector('.main-edit-box').classList.toggle('hidden');
    document.querySelector('.main-gallery').classList.toggle('hidden');
}

function drawText(color, size, font, align, txt, x, y, isSelected) {
    drawRect(x, y, isSelected);
    gCtx.lineWidth = 2;
    gCtx.fillStyle = `${color}`;
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = `${align}`;
    gCtx.fillText(txt, x, y);
}

function drawRect(x, y, isSelected) {
    gCtx.beginPath();
    gCtx.rect(x - 255, y - 60, 580, 90);
    gCtx.strokeStyle = (isSelected) ? 'blue' : 'black';
    gCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    gCtx.fill();
    gCtx.stroke();
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function addInputListeners() {
    document.querySelector('#meme-text').addEventListener('input', updateTextInput);
}

function toggleMenu() {
    document.querySelector('.mobile-nav').classList.toggle('hidden');
}