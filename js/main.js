'use strict'
var gElCanvas;
var gCtx;

var gCurrShape = 'line';
var gCurrColor = 'white';

var glastPos;
var gIsMouseDown = false;
var gIsImgLoaded = false;


function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas()
    // gCtx.fillStyle = 'lightgreen';
    // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
    drawImgFromlocal()
    // drawImgFromRemote()
}

function drawTextUpLine(text = 'text', x = gElCanvas.width / 2, y = 50) {
    let currLine = getCurrLine()
    text = currLine.txt
    let size = currLine.size
    let align = currLine.align
    let color = currLine.color

    gCtx.lineWidth = '2';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px impact`;
    gCtx.textAlign = align;

    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function drawImgFromlocal() {
    let currImg = getCurrImg()
    var img = new Image()
    img.src = currImg.url;//'./img/waves.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        gIsImgLoaded = true
        drawTextUpLine()
    }
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');

    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
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

function drawRect(x, y) {
    gCtx.beginPath();
    var randInt = getRandomIntEx(10, 100)
    gCtx.rect(x - randInt / 2, y - randInt / 2, randInt, randInt);
    // gCtx.rect(x-75, y-75, 150, 150);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.fillStyle = gCurrColor;
    gCtx.fillRect(x - randInt / 2, y - randInt / 2, randInt, randInt);
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

function setColor(color) {
    gCurrColor = color
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
    console.log('glastPos:', glastPos)
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