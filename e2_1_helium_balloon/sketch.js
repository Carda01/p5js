class Balloon {
  constructor () {
    this.position = createVector(width/2, height*5/6);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.time = 0;
    this.helium = createVector(0, -0.2);
  }

  update() {
    if (this.position.y < 0) {
      this.position.y = 1;
      this.velocity.mult(-0.75);
    }
    this.acceleration.add(this.helium);
    this.acceleration.add(createVector(map(noise(this.time), 0, 1, -1, 1), 0)).mult(0.02)

    this.position.x = (width + this.position.x) % width;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);
    this.time += 0.1;
  }

  render() {
    noStroke();
    fill(140, 0, 0);
    circle(this.position.x, this.position.y, 40);
  }
}

let b;

function setup() {
  createCanvas(600, 600);
  b = new Balloon();
}

function draw() {
  background(255);
  b.update();
  b.render();
}
