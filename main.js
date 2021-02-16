// setup drawing contexts

const ctx1 = document.getElementById("canvas1").getContext("2d");
const ctx2 = document.getElementById("canvas2").getContext("2d");
const ctx3 = document.getElementById("canvas3").getContext("2d");

flipContext(ctx1);
flipContext(ctx2);
flipContext(ctx3);

ctx1.lineWidth = 4;
ctx3.lineWidth = 4;
ctx2.globalAlpha = 0.3;

const pointColors = ["red", "#0050FF"];

// setup drawing objects

const bigCircle = {
    x: 200,
    y: 200,
    radius: 150,
    color: "orange",
    filled: false,
};

const point1 = { x: null, y: null, radius: 3, color: pointColors[0], filled: true };
const point2 = { x: null, y: null, radius: 3, color: pointColors[0], filled: true };

// buttons to switch between functions sine and coine

let currentFunctionName = "sin";

const buttons = document.querySelectorAll(".fnBtn");

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const functionName = btn.id.replace("Btn", "");
        if (currentFunctionName === functionName) return;
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        angle = 0;
        clearContext(ctx1);
        clearContext(ctx2);
        currentFunctionName = functionName;
    });
});

// angle and speed of the point on the circle

let angle = 0;
let speed = 1;

// show value

const valueDisplay = document.getElementById("valueDisplay");
function showValue(angle, value) {
    valueDisplay.innerText = `${currentFunctionName}(${angle.toFixed(
        0
    )}°) ≈ ${value.toFixed(2)}`;
}

// main draw function

let animationId;

function draw() {
    clearContext(ctx1);
    clearContext(ctx3);

    drawCircle(bigCircle, ctx1);

    point1.x = bigCircle.x + Math.cos(angle * (Math.PI / 180)) * bigCircle.radius;
    point1.y = bigCircle.y + Math.sin(angle * (Math.PI / 180)) * bigCircle.radius;

    point2.x = 10 + angle;

    if (currentFunctionName === "sin") {
        drawLine(point1.x, point1.y, point1.x, bigCircle.y, ctx1);
        point2.y = point1.y;
        showValue(angle, Math.sin(angle * (Math.PI / 180)));
    } else {
        drawLine(point1.x, point1.y, bigCircle.x, point1.y, ctx1);
        point2.y = point1.x;
        showValue(angle, Math.cos(angle * (Math.PI / 180)));
    }

    drawCircle(point1, ctx1);
    drawCircle(point2, ctx2);

    drawLine(point2.x, point2.y, point2.x, bigCircle.y, ctx3);

    angle += speed;

    if (angle >= 720) {
        angle = 0;
        switchColor(point1);
        switchColor(point2);
    }

    animationId = requestAnimationFrame(draw);
}

// execute draw function

draw();

// switch colors between red and blue

function switchColor(point) {
    point.color = point.color === pointColors[0] ? pointColors[1] : pointColors[0];
}

// auxiliary draw function for a circle

function drawCircle(circle, ctx) {
    if (circle.filled) ctx.fillStyle = circle.color;
    ctx.strokeStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    if (circle.filled) ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

// auxiliary draw function for a line

function drawLine(x, y, u, v, ctx) {
    ctx.strokeStyle = point1.color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(u, v);
    ctx.stroke();
    ctx.closePath();
}

// auxiliary function to clear canvas

function clearContext(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// auxiliary function to clip canvas vertically

function flipContext(ctx) {
    ctx.setTransform(1, 0, 0, -1, 0, ctx.canvas.height);
}

// pause function

let paused = false;
const pauseBtn = document.getElementById("pauseBtn");

pauseBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        animationId = requestAnimationFrame(draw);
        pauseBtn.classList = "far fa-pause-circle";
    } else {
        paused = true;
        cancelAnimationFrame(animationId);
        pauseBtn.classList = "far fa-play-circle";
    }
});

// speed function

const fasterBtn = document.getElementById("fasterBtn");

fasterBtn.addEventListener("click", () => {
    speed *= 1.3;
});

const slowerBtn = document.getElementById("slowerBtn");

slowerBtn.addEventListener("click", () => {
    speed /= 1.3;
});
