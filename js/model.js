var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: './img/1.jpg', keywords: ['happy'] },
    { id: 2, url: './img/2.jpg', keywords: ['happy'] },
    { id: 3, url: './img/3.jpg', keywords: ['happy'] },
    { id: 4, url: './img/4.jpg', keywords: ['happy'] },
    { id: 5, url: './img/5.jpg', keywords: ['happy'] },
    { id: 6, url: './img/6.jpg', keywords: ['happy'] },
    { id: 7, url: './img/7.jpg', keywords: ['happy'] },
    { id: 8, url: './img/8.jpg', keywords: ['happy'] },
    { id: 9, url: './img/9.jpg', keywords: ['happy'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'I love cows',
            size: 50,
            align: 'center',
            color: 'white',
            x: 250,
            y: 50
        },
        {
            txt: 'So I never eat my wife',
            size: 50,
            align: 'center',
            color: 'white',
            x: 250,
            y: 450
        }
    ]
}
function updateSelectedLine() {
    gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
    console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
}

function updateLineLocation(x, y) {
    let currLine = getCurrLine()
    currLine.x = x;
    currLine.y = y;
}

function updateLocaationBy(direction) {
    let currLine = getCurrLine()
    if (direction === 'up') {
        currLine.y -= 5
    } else if (direction === 'down') {
        currLine.y += 5
    }


}
function resizeFontSize(sign) {
    let currLine = getCurrLine()


    if (sign === '+') {
        currLine.size++
    } else if (sign === '-') {
        currLine.size--
    }
}

function resizeFontSizeByNumber(num) {
    let currLine = getCurrLine()
    currLine.size = num
}
function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getAllImages() {
    return gImgs
}

function updateTxt(txt) {
    let currLine = getCurrLine()
    currLine.txt = txt
}

function getCurrImg() {
    return gImgs.find(img => img.id === gMeme.selectedImgId)
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getLines() {
    return gMeme.lines
}