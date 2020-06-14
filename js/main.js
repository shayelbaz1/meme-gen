'use strict'
var gElCanvas;
var gCtx;

var gCurrShape = 'line';
var gCurrColor = 'white';

var gFirstPos;
var gIsMouseDown = false;
var gIsBlur = true


function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas()
    renderCanvas(true)
    renderGallery()
}


function renderCanvas(isBlur = false) {
    gIsBlur = isBlur
    resetShareButton()
    renderTextInput()
    renderSizeInput()
    drawImgFromlocal()
}

function renderGallery() {
    let images = getAllImages()

    let strHtml = images.map(function (img) {
        return `
        <a href="#">
        <img onclick="onSelectImg('${img.id}')" src="${img.url}"></a>
        `
    })

    let elGallery = document.querySelector('.grid-container')
    elGallery.innerHTML = strHtml.join('')
}

window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            let newSrc = URL.createObjectURL(this.files[0]); // set src to blob url
            addImageBySrc(newSrc)
            renderCanvas()
            renderGallery()
        }
    });
});

function imageIsLoaded() {
    alert(this.src);  // blob url
    // update width and height ...
}

function onFilterImages(newSearch) {
    console.log('newSearch:', newSearch)

}

function onSetFont(newFont) {
    updateCurrLineFont(newFont)
    renderCanvas()
}

function onShowGalleryToggle() {
    let elMainContainer = document.querySelector('.main-container')
    elMainContainer.classList.toggle('hide')
}

function onBtnSquare() {
    gIsBlur = !gIsBlur
    renderCanvas(gIsBlur)
}

function onSetColorFont(newColor) {
    updateCurrColor(newColor)
    renderCanvas()

}



function onStroke() {
    updateStroke()
    renderCanvas()

}

function onAlign(newAlign) {
    updateCurrLineAlign(newAlign)//Doing to opposite...
    renderCanvas()

}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function onAddLine(value) {
    const elTextInput = document.querySelector('[name=text]')
    value = elTextInput.value
    addLine(value)
    renderCanvas()
}
function onSwitchLines() {
    // let elCurrLine = document.querySelector('')
    updateSelectedLine()
    renderTextInput()
    renderCanvas()
}


function onSelectImg(imgId) {
    updateSelectedImg(+imgId)
    let elMainContainer = document.querySelector('.main-container')
    if (elMainContainer.classList.contains('hide')) {
        elMainContainer.classList.remove('hide')
    }
    renderCanvas()
}

function onMove(direction) {
    updateLocaationBy(direction)
    renderCanvas()
}


function renderTextInput() {
    let currLine = getCurrLine()
    if (getLines().length === 0) return
    let elTextInput = document.querySelector('[name=text]')
    elTextInput.value = currLine.txt
}
function drawImgFromlocal(url) {
    let currImg = getCurrImg()
    var img = new Image()
    img.src = url ? url : currImg.url;//'./img/waves.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        drawTextLines()
    }
}

function drawTextLines(text, x, y) {
    // let currLine = getCurrLine()
    let lines = getLines()
    let currIdx = getCurrIdx()
    lines.forEach((currLine, idx) => {
        text = currLine.txt
        x = currLine.x
        y = currLine.y

        let size = currLine.size
        let align = currLine.align
        let color = currLine.color
        let stroke = currLine.stroke
        let strokeColor = currLine.strokeColor
        let font = currLine.font
        if (idx === currIdx && !gIsBlur) {
            drawRect(x, y, size + 16, 'white')
        }
        // if (idx === currIdx && !gIsBlur) drawRect(x, y, size + 16, 'white')
        // if (gIsBlur) drawRect(x, y, size + 20, '#00000000')


        gCtx.lineWidth = stroke;
        gCtx.strokeStyle = strokeColor;
        gCtx.fillStyle = color;
        gCtx.font = `${size}px ${font}`;
        gCtx.textAlign = align;

        gCtx.fillText(text, x, y);
        gCtx.strokeText(text, x, y);
    });
}

function onResize(sign) {
    resizeFontSize(sign)
    renderCanvas()
}
function onResizeInput(num) {
    resizeFontSizeByNumber(num)
    renderCanvas()
}

function renderSizeInput() {
    if (getLines().length === 0) return
    let currLine = getCurrLine()
    let size = currLine.size
    let elFontSizeInput = document.querySelector("[name=font-size]")
    elFontSizeInput.value = size

}

function onSetText(txt) {
    updateTxt(txt)
    renderCanvas()

}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    let width = elContainer.offsetWidth
    let height = elContainer.offsetHeight

    updateCanvasSize(width, height)

    gElCanvas.width = width;
    gElCanvas.height = height;
}



function drawImgFromRemote() {
    var img = new Image()
    img.src = 'https://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}

function drawRect(x, y, height, strokeColor = '#00000000') {
    let width = 1000;
    gCtx.beginPath();
    gCtx.rect(x - width / 2, y - height / 2 - 15, width, height);
    // gCtx.rect(x-75, y-75, 150, 150);
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = strokeColor;
    gCtx.stroke();
    gCtx.fillStyle = '#00000000';
    gCtx.fillRect(x - width / 2, y - height / 2 - 15, width, height);
}

function drawText(text, x, y) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = gCurrColor;
    var randInt = getRandomIntEx(10, 60)
    gCtx.font = `${randInt}px sans-serif`;
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillStyle = 'lightgreen';
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function setColorStroke(newColor) {
    updateStrokeColor(newColor)
    renderCanvas()
    // gCurrColor = color
}

function setShape(shape) {
    gCurrShape = shape;
}
function drawLine(x, y, xEnd, yEnd) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.closePath()
    gCtx.strokeStyle = gCurrColor
    gCtx.stroke()
}

function canvasClicked(ev) {
    // TODO: find out if clicked inside of star chart
    const { offsetX: x, offsetY: y } = ev;

    var lines = getLines()
    var clickedLine = lines.find((line, idx) => {
        let startY = line.y - line.size - 6;
        let endY = line.y + 8;

        return (y >= startY && y <= endY);
    });

    if (clickedLine) {
        let currIdx = lines.findIndex(line => clickedLine.y === line.y)
        updateSelectedLine(currIdx)
        renderCanvas()
        return clickedLine
    }
    else {
        renderCanvas(true)
        return null
    }
}

function onMouseMove(ev) {
    if (!gIsMouseDown) return

    const { offsetX, offsetY } = ev
    const currPos = { offsetX, offsetY }

    const newX = currPos.offsetX - gFirstPos.offsetX
    const newY = currPos.offsetY - gFirstPos.offsetY
    const newPosDiff = { newX, newY }

    updateLineLocationByDiff(newX, newY)
    renderCanvas()

    gFirstPos = { offsetX, offsetY }
}


function onMouseDown(ev) {
    gIsMouseDown = true
    canvasClicked(ev)
    let { offsetX, offsetY } = ev;
    gFirstPos = { offsetX, offsetY }
    console.log('gFirstPos:', gFirstPos)
    // draw(offsetX, offsetY)
}
function onMouseUp() {
    gIsMouseDown = false
}

function draw(offsetX, offsetY, newOffsetX, newOffsetY) {

    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY);
            break;
        case 'rect':
            drawRect(offsetX, offsetY);
            break;
        case 'text':
            drawText('Puki', offsetX, offsetY);
            break;
        case 'line':
            drawLine(offsetX, offsetY, newOffsetX, newOffsetY);
            break;
        case 'arc':
            drawArc(offsetX, offsetY);
            break;
    }
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-paint';
}

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}