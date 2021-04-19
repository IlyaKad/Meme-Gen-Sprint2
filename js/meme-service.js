'use strict'

var STORAGE_KEY = 'imgDB'
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = { id: 1 };
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Text Here',
            size: 20,
            align: 'center',
            color: 'rgb(0, 0, 30)'
        }
    ]
}

_createImgs();

function _createImg(url, keywords) {
    return {
        id: gImgs.id++,
        url,
        keywords
    }
}

function _createImgs() {
    var imgs = loadFromStorage(STORAGE_KEY);
    if (!imgs || imgs.length === 0) {
        imgs = [
            _createImg('img/meme-imgs-square/1.jpg', ['silly', 'trump']),
            _createImg('img/meme-imgs-square/2.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/3.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/4.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/5.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/6.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/7.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/8.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/9.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/10.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/11.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/12.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/13.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/14.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/15.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/16.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/17.jpg', ['happy', 'cute']),
            _createImg('img/meme-imgs-square/18.jpg', ['happy', 'cute']),
        ];
    }
    gImgs = imgs;
    saveToStorage(STORAGE_KEY, gImgs);
}

function upDateCurrImg(currImgIdx) {
    gMeme.selectedImgId = currImgIdx;
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function updateText(text) {
    gMeme.lines[0].txt = text;
}

function getEditBtns() {
    // const btns = ['add', 'bigger', 'bin', 'change', 'download', 'fill', 'font', 'share', 'smaller', 'text-left', 'text-mid', 'text-right', 'width'];
    const btns = ['bigger', 'smaller', 'text-left', 'text-mid', 'text-right', 'font', 'fill', 'width'];
    return btns;
}

function editText(action) {
    switch (action) {
        case 'bigger':
            if(gMeme.lines[0].size >= 70) return;
            gMeme.lines[0].size += 2;
            break;
        case 'smaller':
            if(gMeme.lines[0].size <= 20) return;
            gMeme.lines[0].size -= 2;
            break;
        case 'text-left':
            gMeme.lines[0].align = 'right';
            break;
        case 'text-right':
            gMeme.lines[0].align = 'left';
            break;
        case 'text-mid':
            gMeme.lines[0].align = 'center';
            break;
        case 'font':

            break;
        case 'fill':

            break;
        case 'width':

            break;
    }
}