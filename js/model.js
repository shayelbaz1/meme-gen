var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gCanvasData = {
    width: 500,
    height: 500
}
var gImgs = [
    { id: 1, url: './img/1.jpg', keywords: ['trump', 'happy'] },
    { id: 2, url: './img/2.jpg', keywords: ['puppy', 'happy'] },
    { id: 3, url: './img/3.jpg', keywords: ['happy'] },
    { id: 4, url: './img/4.jpg', keywords: ['happy'] },
    { id: 5, url: './img/5.jpg', keywords: ['happy'] },
    { id: 6, url: './img/6.jpg', keywords: ['happy'] },
    { id: 7, url: './img/7.jpg', keywords: ['happy'] },
    { id: 8, url: './img/8.jpg', keywords: ['happy'] },
    { id: 9, url: './img/9.jpg', keywords: ['happy'] },
    { id: 10, url: './img/10.jpg', keywords: ['happy'] },
    { id: 11, url: './img/11.jpg', keywords: ['happy'] },
    { id: 12, url: './img/12.jpg', keywords: ['happy'] },
    { id: 13, url: './img/13.jpg', keywords: ['happy'] },
    { id: 14, url: './img/14.jpg', keywords: ['happy'] },
    { id: 15, url: './img/15.jpg', keywords: ['happy'] },
    { id: 16, url: './img/16.jpg', keywords: ['happy'] },
    { id: 17, url: './img/17.jpg', keywords: ['happy'] },
    { id: 18, url: './img/18.jpg', keywords: ['happy'] },
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'I love cows',
            size: 50,
            font: 'impact',
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            stroke: 2,
            x: gCanvasData.width / 2,
            y: 50
        },
        {
            txt: 'So I never eat my wife',
            size: 50,
            font: 'impact',
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            stroke: 2,
            x: gCanvasData.width / 2,
            y: gCanvasData.height - 50
        }
    ]
}

function getAllImages() {
    return gImgs
}

function filterImages(newSearch) {
    return gImgs.filter(img => img.keywords.includes(newSearch))
}

function updateCanvasSize(width, height) {
    gCanvasData.width = width
    gCanvasData.height = height
    if (gCanvasData.width <= 300) updateFirstTwoLines()
}


function updateFirstTwoLines() {
    gMeme.lines[0].x = gCanvasData.width / 2
    gMeme.lines[0].y = 40
    gMeme.lines[1].x = gCanvasData.width / 2
    gMeme.lines[1].y = gCanvasData.height - 20
    gMeme.lines.forEach(line => line.size = 32)
}

function getCanvasData() {
    return gCanvasData
}
function updateCurrColor(newColor) {
    let currLine = getCurrLine()
    currLine.color = newColor
}

function updateStrokeColor(newColor) {
    let currLine = getCurrLine()
    currLine.strokeColor = newColor
}

function updateStroke() {
    let currLine = getCurrLine()
    currLine.stroke = (currLine.stroke === 4) ? 1 : currLine.stroke += 1;
    console.log('currLine.stroke:', currLine.stroke)
}

function updateCurrLineAlign(newAlign) {
    let currLine = getCurrLine()
    switch (newAlign) {
        case 'right':
            currLine.align = 'right'
            currLine.x = gCanvasData.width - 20
            break;
        case 'left':
            currLine.align = 'left'
            currLine.x = 10
            break;
        default:
            currLine.align = 'center'
            currLine.x = gCanvasData.width / 2
            break;
    }
}

function updateCurrLineFont(newFont) {
    let currLine = getCurrLine()
    currLine.font = newFont
}

function deleteLine() {
    console.log('gMeme.lines before:', gMeme.lines)
    console.log('gMeme.selectedLineIdx before:', gMeme.selectedLineIdx)
    let lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
    updateSelectedLine()
}


function addLine(value) {
    let size = gCanvasData.width <= 300 ? 30 : 50
    var newLine = {
        txt: value,
        size: size,
        font: 'impact',
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        stroke: 2,
        x: gCanvasData.width / 2,
        y: gCanvasData.width / 2
    }
    gMeme.lines.push(newLine)
}

function getCurrIdx() {
    return gMeme.selectedLineIdx
}

function updateSelectedLine(idx) {
    if (idx || idx === 0) {
        gMeme.selectedLineIdx = idx
        return
    }
    else if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
        return
    }
    gMeme.selectedLineIdx += 1
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
    currLine.size = +num
}
function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
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