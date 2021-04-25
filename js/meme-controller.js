'use strict'


var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d');
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

function renderCanvas() {
    let meme = getMeme();
    let lines = meme.lines;
    addImg(meme.selectedImgId);
    lines.forEach((line, idx) => {
        drawText(line.color, line.size, line.font, line.align, line.txt, line.x, line.y, idx === meme.selectedLineIdx);
    });
}

function addImg(imgIdx) {
    const elImg = new Image();
    elImg.src = `./img/meme-imgs-square/${imgIdx}.jpg`;
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onOpenEditBox(imgIdx) {
    initMeme();
    updateCurrImg(imgIdx);
    document.querySelector('.main-edit-box').classList.toggle('hidden');
    document.querySelector('.main-gallery').classList.toggle('hidden');
    resizeCanvas();
    renderCanvas();
    addListeners();
}

function drawText(color, size, font, align, txt, x, y, isSelected) {
    // drawRect(x, y, isSelected);
    gCtx.lineWidth = 0.8;
    gCtx.fillStyle = `${color}`;
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = `${align}`;
    gCtx.strokeStyle = (isSelected) ? 'red' : `${color}`;
    gCtx.strokeText(txt, gElCanvas.width / 2, y);
    gCtx.fillText(txt, gElCanvas.width / 2, y);
}

function addListeners() {
    addInputListeners();
    // addMouseListeners();
    // addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderCanvas();
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetWidth;
}

function onUpdateTextInput(ev) {
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
    renderCanvas();
}

function onFontChange(ev) {
    let font = ev.target.value;
    fontChange(font);
    renderCanvas();
}

function onFillChange(ev) {
    let fill = ev.target.value;
    fillChange(fill);
    renderCanvas();
}

function onDownloadMeme(elBtn) {
    let meme = getMeme();
    let lines = meme.lines;
    addImg(meme.selectedImgId);
    lines.forEach((line, idx) => {
        drawText(line.color, line.size, line.font, line.align, line.txt, line.x, line.y, false);
    });
    const data = gElCanvas.toDataURL();
    renderCanvas();
    elBtn.href = data;
    elBtn.download = 'Your Meme';
}

// function drawRect(x, y, isSelected) {
//     let canvas = getCanvasDim();
//     gCtx.beginPath();
//     gCtx.rect(20, y - 75, gElCanvas.width - 40, 115);
//     gCtx.strokeStyle = (isSelected) ? 'blue' : 'black';
//     gCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
//     gCtx.fill();
//     gCtx.stroke();
// }

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
    document.querySelector('#meme-text').addEventListener('input', onUpdateTextInput);
    // document.querySelector('#meme-search').addEventListener('input', onSearchText);
}

// function onSearchText(ev) {
//     let text = ev.target.value;
//     updateText(text);
// }

function onSaveMeme() {
    document.querySelector('.modal-saved').classList.remove('hidden');
    setTimeout(function () {document.querySelector('.modal-saved').classList.add('hidden')}, 750)
    const data = gElCanvas.toDataURL();
    saveMeme(data);
}

function onGoSavedMemes() {
    document.querySelector('.main-saved-memes').classList.remove('hidden');
    document.querySelector('.main-edit-box').classList.add('hidden');
    document.querySelector('.main-gallery').classList.add('hidden');
    document.querySelector('.modal').classList.add('hidden');
    initMeme();
    let memes = getMemes();
    if (!memes.length) {
        let strHTML = `<h1 class="no-saved-memes">No saved memes!!!</h1>`;
        document.querySelector('.saved-memes').innerHTML = strHTML;
    } else {
        let i = 0;
        let strHTML = memes.map(function (meme) {
            return `
            <img src="${meme.url}" alt="meme-img" onclick="onOpenEditBoxFromSave(${i++})">
            `
        })
        document.querySelector('.saved-memes').innerHTML = strHTML.join('');
    }
}

function onOpenEditBoxFromSave(savedIdx) {
    // initMeme();
    let memes = getSavedMeme();
    updateCurrImg(memes[savedIdx].imgIdx);
    document.querySelector('.main-saved-memes').classList.add('hidden');
    document.querySelector('.main-edit-box').classList.remove('hidden');
    resizeCanvas();
    let meme = memes[savedIdx];
    let lines = meme.lines;
    addImg(meme.selectedImgId);
    lines.forEach((line, idx) => {
        drawText(line.color, line.size, line.font, line.align, line.txt, line.x, line.y, idx === meme.selectedLineIdx);
    });
    addListeners();
}

function onGoAbout() {
    let strHTML = `<h1>The feature is, under construction.</h1>
    <img src="./img/under-construction.jpeg" alt="Under construction">`;
    document.querySelector('.modal').innerHTML = strHTML;
    document.querySelector('.modal').classList.remove('hidden');
    document.querySelector('.main-saved-memes').classList.add('hidden');
    document.querySelector('.main-edit-box').classList.add('hidden');
    document.querySelector('.main-gallery').classList.add('hidden');
}

function onGoGallery() {
    document.querySelector('.main-edit-box').classList.add('hidden');
    document.querySelector('.main-saved-memes').classList.add('hidden');
    document.querySelector('.main-gallery').classList.remove('hidden');
    document.querySelector('.modal').classList.add('hidden');
}

function toggleMenu() {
    document.querySelector('.mobile-nav').classList.toggle('hidden');
}

function onCloseEditor() {
    document.querySelector('.main-edit-box').classList.toggle('hidden');
    document.querySelector('.main-gallery').classList.toggle('hidden');
}