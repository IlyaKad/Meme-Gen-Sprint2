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
    upDateCurrImg(imgIdx);
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
    let meme = getMeme();
    addImg(meme.selectedImgId);
    drawText(meme.lines[0].txt, meme.lines[0].size, meme.lines[0].align, gElCanvas.width / 2, 80);
    // inputText(meme.lines[0].txt);
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
    // const elImg = new Image();
    // elImg.src = `./img/meme-imgs-square/${imgIdx}.jpg`;
    // elImg.onload = () => {
    //     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    // }
    const elImg = new Image();
    elImg.src = `./img/meme-imgs-square/${imgIdx}.jpg`;
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function addListeners() {
    // addMouseListeners();
    // addTouchListeners();
    addInputListeners();
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

function onCloseEditor() {
    document.querySelector('.main-edit-box').classList.toggle('hidden');
    document.querySelector('.main-gallery').classList.toggle('hidden');
}

function drawText(text = 'Text here', font, align, x = 150, y = 50) {
    gCtx.lineWidth = 2;
    gCtx.fillStyle = 'rgb(0, 0, 35)';
    gCtx.font = `${font}px impact`;
    gCtx.textAlign = `${align}`;
    gCtx.fillText(text, x, y);
    drawRect(gElCanvas.width - 50, y + 10);
}

function drawRect(x, y) {
    gCtx.beginPath();
    gCtx.rect(20, 20, x, y);
    gCtx.strokeStyle = 'black';
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