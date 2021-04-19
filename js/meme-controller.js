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
            <img src="./img/meme-imgs-square/${img.id}.jpg" alt="meme-img" onclick="onEditBox(${img.id})">
        `
    })
    document.querySelector('.gallery').innerHTML = strHTML.join('');
}

function onEditBox(imgIdx) {
    document.querySelector('.main-edit-box').classList.toggle('hidden');
    document.querySelector('.main-gallery').classList.toggle('hidden');
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    addImg(imgIdx);
    drawText('Text here', gElCanvas.width / 2, 80);
    // addListeners();
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
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
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
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

function onCloseEditor() {
    document.querySelector('.main-edit-box').classList.toggle('hidden');
    document.querySelector('.main-gallery').classList.toggle('hidden');
}

function drawText(text = 'Text here', x = 150, y = 50) {
    gCtx.lineWidth = 2;
    // gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'rgb(0, 0, 35)';
    gCtx.font = '40px impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    // gCtx.strokeText(text, x, y);
    drawRect(x, y);
}

function drawRect(x, y) {
    gCtx.beginPath();
    gCtx.rect(x, y, 150, 150);
    // gCtx.fillStyle = 'orange';
    // gCtx.fillRect(x, y, 150, 150);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}