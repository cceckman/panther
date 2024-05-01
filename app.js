
const canvas = document.getElementById("cage");

var size;

class Axis {
	constructor(start, end, velocity) {
		this.start = start;
		this.end = end;
		this.velocity = velocity;
		this.position = Math.random() * (this.end - this.start) + this.start;
	}

	update(speed, start, end) {
		const n = this.velocity * speed + this.position;
		this.start = start;
		this.end = end;

		if (n < (this.start + size) || n > (this.end - size)) {
			// Collide, and change position in the other directon:
			this.velocity = -this.velocity;
			this.position += this.velocity * speed;
		} else {
			this.position = n;
		}
	}

	get() {
		return this.position;
	}
}

var x = null;
var y = null;

function draw(ctx) {
	ctx.fillStyle = "darkgray";
	ctx.fillRect(x.start, y.start, x.end - x.start, y.end - y.start);

	ctx.fillStyle = "black";

	ctx.beginPath();
	ctx.ellipse(x.get(), y.get(), size, size, 0, 0, 360);
	ctx.fill();
	ctx.closePath();
}

let panther = null;
let last_render = performance.now();

function rerender(timestamp) {
	window.requestAnimationFrame(rerender);

	canvas.height = canvas.clientHeight;
	canvas.width = canvas.clientWidth;
	let xmargin = canvas.width / 4;
	let ymargin = canvas.width / 4;

	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	if (x === null) {
		x = new Axis(xmargin, xmargin * 3, Math.random() * xmargin * 0.02);
	}
	if (y === null) {
		y = new Axis(ymargin, ymargin * 3, Math.random() * ymargin * 0.02);
	}

	let speed = timestamp - last_render;
	x.update(speed / 100, xmargin, xmargin * 3);
	y.update(speed / 100, ymargin, ymargin * 3);
	draw(ctx);
}

window.requestAnimationFrame(rerender);

