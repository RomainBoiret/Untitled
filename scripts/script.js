const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const scaleFactor = 10;
canvas.width = 500 * scaleFactor;
canvas.height = 500 * scaleFactor;
ctx.scale(scaleFactor, scaleFactor);

const iterationsSlider = document.getElementById('iterations');
const sizeSlider = document.getElementById('size');
const speedSlider = document.getElementById('speed');

let maxDepth = parseInt(iterationsSlider.value);
let figureWidth = parseInt(sizeSlider.value);
let speed = parseInt(speedSlider.value);

let pointX = canvas.width / 6;
let pointY = canvas.height / 3.5;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    pointX = figureWidth / 5;
    pointY = figureWidth / 4;
    currentAngle = 0;
    drawQueue = [];
    
    for (let i = 0; i < 3; i++) {
        chapeaux(figureWidth, maxDepth);
        rotate(120, 'horaire');
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let index = 0;

    function step() {
        // Dessiner moins de lignes à chaque frame pour ralentir l'animation
        for (let i = 0; i < Math.min(speed, 5); i++) {
            if (index < drawQueue.length) {
                const line = drawQueue[index++];
                ctx.strokeStyle = line.color;
                ctx.beginPath();
                ctx.moveTo(line.fromX, line.fromY);
                ctx.lineTo(line.toX, line.toY);
                ctx.stroke();
            } else {
                return; // Stop l'animation quand toutes les lignes sont dessinées
            }
        }
        requestAnimationFrame(step);
    }
    step();
}

// Mettre à jour la figure et l'animation lorsque les sliders changent
iterationsSlider.addEventListener('input', function() {
    maxDepth = parseInt(this.value);
    draw();
});

sizeSlider.addEventListener('input', function() {
    figureWidth = parseInt(this.value);
    draw();
});

speedSlider.addEventListener('input', function() {
    speed = parseInt(this.value);
});

// Gestionnaire d'événements pour le bouton "Dessiner la figure"
const drawButton = document.getElementById('draw-button');
drawButton.addEventListener('click', function() {
    draw();
    animate(); // Commencer l'animation lorsque le bouton est cliqué
});

// Démarrage initial
draw();
animate();
