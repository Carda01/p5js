class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.position = createVector(x, y, mass);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.coeff = random(0.01, 1);
    this.radius = mass * 8;
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

  calculateFriction() {
    return this.velocity.copy().mult(-1).setMag(this.coeff);
  }

  isSelected() {
    if(mouseIsPressed) {
      let mouse = createVector(mouseX, mouseY);
      if (p5.Vector.dist(mouse, this.position) < this.radius) {
        this.position = mouse;
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
      }
    }
  }

  show() {
    stroke(0);
    fill(175);

    circle(this.position.x, this.position.y, this.radius * 2);
  }

  contactEdge() {
    return this.position.y > (height - this.radius - 1);
  }

  bounceEdges() {
    let bounce = -0.9
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= bounce;
    } else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= bounce;
    }
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= bounce;
    }
    if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= bounce;
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
  let gravity = createVector(0, 1);
  let wind = createVector(0.05, 0);
  for (let i = 0; i < 10; i++) {
    if (mouseIsPressed) {
      movers[i].applyForce(wind);
    }

    if (movers[i].contactEdge()) {
      let friction = movers[i].calculateFriction();
      movers[i].applyForce(friction);
    }

    movers[i].isSelected();
    movers[i].applyForce(gravity);
    movers[i].bounceEdges();
    movers[i].update();
    movers[i].show();
  }
}