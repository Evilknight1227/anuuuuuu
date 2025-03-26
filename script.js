const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const maxHearts = 100;

// Heart Particle Class
class Heart {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.opacity = 1;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ff1493";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y - this.size / 1.5, 
            this.x - this.size, this.y + this.size / 3, 
            this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x + this.size, this.y + this.size / 3, 
            this.x + this.size / 2, this.y - this.size / 1.5, 
            this.x, this.y
        );
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.005;
    }
}

// Function to generate hearts randomly
function createHeart() {
    if (hearts.length < maxHearts) {
        let x = Math.random() * canvas.width;
        let y = canvas.height + 20;
        let size = Math.random() * 15 + 10;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = Math.random() * 2 + 1;
        hearts.push(new Heart(x, y, size, speedX, speedY));
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        if (heart.opacity <= 0) {
            hearts.splice(index, 1);
        }
    });

    createHeart();
    requestAnimationFrame(animate);
}

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation
animate();
