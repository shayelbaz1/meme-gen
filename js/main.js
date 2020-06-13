'use strict'
var gElCanvas;
var gCtx;

var gCurrShape = 'line';
var gCurrColor = 'white';

var glastPos;
var gIsMouseDown = false;
var gIsImgLoaded = false;
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
        <img onclick="onSelectImg('${img.id}')" src="./img/${img.id}.jpg">
        `
    }).join('')

    let elGallery = document.querySelector('.grid-container')
    elGallery.innerHTML = strHtml
}

function onFilterImages(newSearch) {
    console.log('newSearch:', newSearch)

}

function canvasClicked(ev) {
    // TODO: find out if clicked inside of star chart
    const { offsetX: x, offsetY: y } = ev;
    console.log('{offsetX: x, offsetY: y}:', { offsetX: x, offsetY: y })

    var lines = getLines()
    console.log('lines:', lines)
    var clickedLine = lines.find((line, idx) => {
        let startY = line.y - line.size - 6;
        let endY = line.y + 8;
        console.log('startY:', startY)
        console.log('endY:', endY)

        return (y >= startY && y <= endY);
    });
    if (clickedLine) {
        let currIdx = lines.findIndex(line => clickedLine.y === line.y)
        updateSelectedLine(currIdx)
        renderCanvas()

    }
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
    let elTextInput = document.querySelector('[name=text]')
    var value = elTextInput.value
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
    console.log('currLine:', currLine)
    elTextInput.value = currLine.txt
}
function drawImgFromlocal() {
    let currImg = getCurrImg()
    var img = new Image()
    img.src = currImg.url;//'./img/waves.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        gIsImgLoaded = true
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


function drawTriangle(x, y) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    var randInt = getRandomIntEx(10, 101)
    gCtx.lineTo(x + randInt, y);
    gCtx.lineTo(x, y + randInt);
    gCtx.closePath(); //insted of lineTo(x,y) 
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.fillStyle = gCurrColor;
    gCtx.fill();
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

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    var randInt = getRandomIntEx(10, 61)
    gCtx.arc(x, y, randInt, 0, 2 * Math.PI);
    gCtx.strokeStyle = 'black'
    gCtx.stroke();
    gCtx.fillStyle = gCurrColor
    gCtx.fill()

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
function onMouseMove(ev) {
    if (!gIsMouseDown) return
    var { offsetX, offsetY } = ev;
    var currPos = { offsetX, offsetY }
    draw(glastPos.offsetX, glastPos.offsetY, currPos.offsetX, currPos.offsetY)
    glastPos = { offsetX, offsetY }
}


function onMouseDown(ev) {
    gIsMouseDown = true
    var { offsetX, offsetY } = ev;
    glastPos = { offsetX, offsetY }
    draw(offsetX, offsetY)
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