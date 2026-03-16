class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.position = createVector(x, y, mass);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  show() {
    stroke(0);
    fill(175);

    circle(this.position.x, this.position.y, this.mass * 16);
  }

  checkEdges() {
    if (this.position.x > width - (this.mass * 8)) {
      this.position.x = width - this.mass * 8;
      this.velocity.x *= -1;
    } else if (this.position.x < (this.mass * 8)) {
      this.velocity.x *= -1;
      this.position.x = this.mass * 8;
    }

    if (this.position.y > height - (this.mass * 8)) {
      this.velocity.y *= -1;
      this.position.y = height - this.mass * 8;
    }
  }
}

let movers;

function setup() {
  createCanvas(600, 600);
  movers = new Array(10);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), random(height), random(10))
  }
}

function draw() {
  background(255);
  let gravity = createVector(0, 0.1);
  let wind = createVector(0.05, 0);
  for (let i = 0; i < 10; i++) {
    if (mouseIsPressed) {
      movers[i].applyForce(wind);
    }
    let force = p5.Vector.sub(createVector(mouseX, mouseY), movers[i].position).normalize().mult(-0.002);
    movers[i].applyForce(force);
    movers[i].applyForce(gravity);
    movers[i].checkEdges();
    movers[i].update();
    movers[i].show();
  }
}
