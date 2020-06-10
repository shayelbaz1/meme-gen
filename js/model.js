var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [{ id: 1, url: './img/waves.jpg', keywords: ['happy'] }];

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

function getCurrImg() {
    return gImgs.find(img => img.id === gMeme.selectedImgId);
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}