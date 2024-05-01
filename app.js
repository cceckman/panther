
const canvas = document.getElementById("cage");

let cage_height = 100.0;
let cage_width = 100.0;

class Panther {
	constructor(size, x, y, xv, yv) {
		this.x = x;
		this.y = y;
		this.xv = xv;
		this.yv = yv;
		this.size = size;
	}

	// Update X and Y coordinates by the veolcity.
	pace(speed) {
		const newx = this.xv * speed + this.x;
		const newy = this.yv * speed + this.y;


		this.x = Math.max(this.size, Math.min(cage_width - this.size, newx));
		this.y = Math.max(this.size, Math.min(cage_width - this.size, newy));
	}

	// Bounce off the walls of the cage- maybe.
	collide() {
		const x_distance = Math.min(this.x, cage_width - this.x);
		const y_distance = Math.min(this.y, cage_height - this.y);

		if (x_distance <= this.size) {
			// X collision. Reflect X velocity.
			this.xv = 0 - this.xv;
		}
		if (y_distance <= this.size) {
			// Y collision. Reflect Y velocity.
			this.yv = 0 - this.yv;
		}
	}

	draw(ctx) {
		ctx.fillStyle = "black";

		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, 360);
		ctx.fill();
		ctx.closePath();
	}
}

let panther = null;
let last_render = performance.now();

function rerender(timestamp) {
	window.requestAnimationFrame(rerender);

	canvas.height = canvas.clientHeight;
	canvas.width = canvas.clientWidth;
	cage_height = canvas.height;
	cage_width = canvas.width;
	let ctx = canvas.getContext("2d");

	ctx.fillStyle = "darkgray";
	ctx.fillRect(0, 0, cage_width, cage_height);

	if (panther === null) {
		const size = Math.min(cage_width, cage_height) * 0.24;
		// Avoid collisions at start:
		const x = Math.random() * (cage_width - 2 * size) + size;
		const y = Math.random() * (cage_height - 2 * size) + size;
		// Kinda-random values;
		// no idea what the scale is?
		const xv = Math.random() * size * 0.1;
		const yv = Math.random() * size * 0.1;

		panther = new Panther(size, x, y, xv, yv)
	}

	panther.collide();
	let speed = timestamp - last_render;
	last_render = timestamp;
	panther.pace(speed / 100);
	panther.draw(ctx);
}

window.requestAnimationFrame(rerender);

