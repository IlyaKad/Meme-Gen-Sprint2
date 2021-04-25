'use strict'

var STORAGE_KEY = 'memeDB';
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = { id: 1 };
var gMemes;
var gMeme;

_createImgs();

function _createImg(url, keywords) {
    return {
        id: gImgs.id++,
        url,
        keywords
    }
}

function _createImgs() {
    var imgs = loadFromStorage(STORAGE_KEY.img);
    if (!imgs || imgs.length) {
        imgs = [
            _createImg('img/meme-imgs-square/1.jpg', ['silly', 'trump']),
            _createImg('img/meme-imgs-square/2.jpg', ['puppy', 'cute']),
            _createImg('img/meme-imgs-square/3.jpg', ['puppy', 'toddler']),
            _createImg('img/meme-imgs-square/4.jpg', ['cats', 'cute']),
            _createImg('img/meme-imgs-square/5.jpg', ['strong', 'toddler']),
            _createImg('img/meme-imgs-square/6.jpg', ['cannot']),
            _createImg('img/meme-imgs-square/7.jpg', ['toddler', 'funny']),
            _createImg('img/meme-imgs-square/8.jpg', ['smart']),
            _createImg('img/meme-imgs-square/9.jpg', ['evil', 'toddler']),
            _createImg('img/meme-imgs-square/10.jpg', ['funny', 'obama']),
            _createImg('img/meme-imgs-square/11.jpg', ['funny']),
            _createImg('img/meme-imgs-square/12.jpg', ['funny']),
            _createImg('img/meme-imgs-square/13.jpg', ['celebrate', 'smart']),
            _createImg('img/meme-imgs-square/14.jpg', ['know', 'smart']),
            _createImg('img/meme-imgs-square/15.jpg', ['cannot', 'smart']),
            _createImg('img/meme-imgs-square/16.jpg', ['funny', 'silly']),
            _createImg('img/meme-imgs-square/17.jpg', ['putin', 'evil']),
            _createImg('img/meme-imgs-square/18.jpg', ['toys', 'worry'])
        ];
    }
    gImgs = imgs;
}

function _createLine(y = 90) {
    return {
        color: 'rgb(0, 0, 30)',
        size: 30,
        font: 'impact',
        align: 'center',
        txt: 'Text Here',
        x: 275.5,
        y
    }
}

function initMeme() {
    gMemes = loadFromStorage(STORAGE_KEY);
    if (!gMemes || gMemes.length === 0) {
        gMemes = [];
    }
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        url: '',
        lines: [
            {
                color: 'rgb(0, 0, 30)',
                size: 30,
                font: 'impact',
                align: 'center',
                txt: 'Text Here',
                x: 275.5,
                y: 90
            }
        ]
    }
}

function getSavedMeme() {
    gMemes = loadFromStorage(STORAGE_KEY);
    return gMemes;
}

function updateCurrImg(currImgId) {
    gMeme.selectedImgId = currImgId;
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function updateText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function editText(action) {
    var currLine = gMeme.selectedLineIdx;
    switch (action) {
        case 'bigger':
            if (gMeme.lines[currLine].size >= 62) return;
            gMeme.lines[currLine].size += 2;
            break;
        case 'smaller':
            if (gMeme.lines[currLine].size <= 20) return;
            gMeme.lines[currLine].size -= 2;
            break;
        case 'text-left':
            gMeme.lines[currLine].align = 'right';
            break;
        case 'text-right':
            gMeme.lines[currLine].align = 'left';
            break;
        case 'text-mid':
            gMeme.lines[currLine].align = 'center';
            break;
    }
}

function fontChange(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function fillChange(fill) {
    gMeme.lines[gMeme.selectedLineIdx].color = fill;
}

function addLine() {
    gMeme.selectedLineIdx++;
    let y = 90 + gMeme.selectedLineIdx * 130;
    let line = _createLine(y);
    gMeme.lines.push(line);
}

function updateTextPosition(amount) {
    let currLine = gMeme.selectedLineIdx;
    if (amount < 0) {
        if (gMeme.lines[currLine].y <= 90) return;
        gMeme.lines[currLine].y += amount;
    } else {
        if (gMeme.lines[currLine].y >= gMeme.canvasWidth - 24) return;
        gMeme.lines[currLine].y += amount;
    }
}

function changeLine() {
    let linesNum = gMeme.lines.length;
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= linesNum) gMeme.selectedLineIdx = 0;
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx--;
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 0;
}

function saveMeme(meme) {
    gMeme.url = meme;
    gMemes.push(gMeme);
    saveToStorage(STORAGE_KEY, gMemes);
}

function getMemes() {
    return gMemes;
}