const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

ctx1.setTransform(1, 0, 0, -1, 0, canvas1.height);
ctx2.setTransform(1, 0, 0, -1, 0, canvas2.height);

ctx1.lineWidth = 4;
ctx2.globalAlpha = 0.3;

ctx1.strokeStyle = "red";
ctx2.strokeStyle = "red";

let angle = 0;

const bigCircle = {
    x: 200,
    y: 200,
    radius: 150,
    color: "orange",
    filled: false,
};

const point1 = { x: null, y: null, radius: 3, color: "red", filled: true };
const point2 = { x: null, y: null, radius: 3, color: "red", filled: true };

let currentFunction = "sine";

const btn = {
    sine: document.getElementById("sineBtn"),
    cosine: document.getElementById("cosineBtn"),
};

for (const name of Object.keys(btn)) {
    btn[name].addEventListener("click", () => {
        if (currentFunction === name) return;
        for (const key of Object.keys(btn)) {
            btn[key].classList.remove("active");
        }
        btn[name].classList.add("active");
        angle = 0;
        clearContext(ctx1);
        clearContext(ctx2);
        currentFunction = name;
    });
}

draw();

function draw() {
    clearContext(ctx1);

    drawCircle(bigCircle, ctx1);

    point1.x = bigCircle.x + Math.cos((angle * Math.PI) / 180) * bigCircle.radius;
    point1.y = bigCircle.y + Math.sin((angle * Math.PI) / 180) * bigCircle.radius;

    drawCircle(point1, ctx1);

    if (currentFunction === "sine") {
        drawLine(point1.x, point1.y, point1.x, bigCircle.y, ctx1);
    } else {
        drawLine(point1.x, point1.y, bigCircle.x, point1.y, ctx1);
    }

    point2.x = 10 + angle;
    point2.y = currentFunction === "sine" ? point1.y : point1.x;

    drawCircle(point2, ctx2);

    angle++;

    if (angle === 720) {
        angle = 0;
        point1.color = point1.color === "red" ? "#0050FF" : "red";
        point2.color = point2.color === "red" ? "#0050FF" : "red";
    }

    requestAnimationFrame(draw);
}

function drawCircle(circle, ctx) {
    if (circle.filled) ctx.fillStyle = circle.color;
    ctx.strokeStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    if (circle.filled) ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawLine(x, y, u, v, ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(u, v);
    ctx.stroke();
    ctx.closePath();
}

function clearContext(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
