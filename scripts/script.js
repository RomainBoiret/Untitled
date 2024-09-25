const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const scaleFactor = 10;
canvas.width = 500 * scaleFactor;
canvas.height = 500 * scaleFactor;
ctx.scale(scaleFactor, scaleFactor);

let pointX = 100;
let pointY = 100;
let currentAngle = 0;
let drawQueue = [];

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function rotate(degrees, direction = 'horaire') {
    currentAngle += direction === 'horaire' ? degrees : -degrees;
}

function drawLine(length) {
    const newX = pointX + length * Math.cos(degreesToRadians(currentAngle));
    const newY = pointY + length * Math.sin(degreesToRadians(currentAngle));

    drawQueue.push({ 
        fromX: pointX, 
        fromY: pointY, 
        toX: newX, 
        toY: newY, 
        color: getRandomColor() 
    });

    pointX = newX;
    pointY = newY;
}

function chapeaux(length, depth) {
    if (depth > 1) {
        chapeaux(length / 3, depth - 1);
        rotate(60, 'antihoraire');
        chapeaux(length / 3, depth - 1);
        rotate(120, 'horaire');
        chapeaux(length / 3, depth - 1);
        rotate(300, 'horaire');
        chapeaux(length / 3, depth - 1);
    }
    if (depth === 1) {
        drawLine(length / 3);
    }
}

function draw() {
    ctx.lineWidth = 2;

    let index = 0;

    function animate() {
        if (index < drawQueue.length) {
            const line = drawQueue[index++];
            ctx.strokeStyle = line.color;
            ctx.beginPath();
            ctx.moveTo(line.fromX, line.fromY);
            ctx.lineTo(line.toX, line.toY);
            ctx.stroke();
            requestAnimationFrame(animate);
        }
    }

    animate();
}

function startDrawing() {
    for (let i = 0; i < 3; i++) {
        chapeaux(700, 5);
        rotate(120, 'horaire');
    }

    draw();
}

startDrawing();
