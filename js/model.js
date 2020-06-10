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
            txt: 'I never eat Falafel',
            size: 50,
            align: 'center',
            color: 'white'
        }
    ]
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