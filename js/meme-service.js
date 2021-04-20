'use strict'

var STORAGE_KEY = 'imgDB';
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = { id: 1 };
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            color: 'rgb(0, 0, 30)',
            size: 30,
            font: 'impact',
            align: 'center',
            txt: 'Text Here',
            x: 275.5,
            y: 80
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
    var imgs = loadFromStorage(STORAGE_KEY.img);
    if (!imgs || imgs.length) {
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
            _createImg('img/meme-imgs-square/18.jpg', ['happy', 'cute'])
        ];
    }
    gImgs = imgs;
    saveToStorage(STORAGE_KEY, gImgs);
}

function _createLine(y) {
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

// function _createMeme(selectedImgId, selectedLineIdx, txt, size, align, color) {
//     return {
//         selectedImgId,
//         selectedLineIdx,
//         lines: [
//             {
//                 txt,
//                 size,
//                 align,
//                 color
//             }
//         ]
//     }
// }

// function _createMemes() {
//     var memes = loadFromStorage(STORAGE_KEY);
//     if (!memes || !memes.length) {
//         memes = [
//             _createMeme(0, 0, 'Text Here', 26, 'center', 'rgb(0,0,30)'),
//         ]
//     }
//     gMeme = memes;
//     saveToStorage(STORAGE_KEY, gMeme);
// }

function updateCurrImg(currImgIdx) {
    gMeme.selectedImgId = currImgIdx;
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

function getEditBtns() {
    // const btns = ['add', 'bigger', 'bin', 'change', 'download', 'fill', 'font', 'share', 'smaller', 'text-left', 'text-mid', 'text-right', 'width'];
    const btns = ['bigger', 'smaller', 'text-left', 'text-mid', 'text-right', 'font', 'fill', 'width'];
    return btns;
}

function editText(action) {
    switch (action) {
        case 'bigger':
            if (gMeme.lines[0].size >= 70) return;
            gMeme.lines[0].size += 2;
            break;
        case 'smaller':
            if (gMeme.lines[0].size <= 20) return;
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

function addLine() {
    gMeme.selectedLineIdx++;
    let y = (gMeme.lines.length + 1) * 110;
    let line = _createLine(y);
    gMeme.lines.push(line);
}

function updateTextPosition(amount) {
    let currLine = gMeme.selectedLineIdx;
    gMeme.lines[currLine].y += amount;
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
}