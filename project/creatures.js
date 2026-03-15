const minDefaultSize = 10;
const maxDefaultSize = 30;

class Creature {
  constructor(sizeRange = null, x = null, y = null, topSpeed = 10) {
    if (!sizeRange) {
      sizeRange = createVector(minDefaultSize, maxDefaultSize);
    }
    this.size = random(sizeRange.x, sizeRange.y);
    if (!x){
      x = random(this.size, width - this.size);
    }
    if (!y) {
      y = random(this.size, height - this.size);
    }
    
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(0.2);
    this.acceleration = createVector(0, 0);
    this.topSpeed = topSpeed;
    this.time = p5.Vector.random2D().mult(100000);
    this.timeChange = 0.01;
  }
  
  updateTime() {
    this.time.x += this.timeChange;
    this.time.y += this.timeChange;
  }
  
  update() {
    this.position.add(this.velocity);
    this.checkBorders();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.updateAcceleration();
    this.updateTime();
  }
  
  restrainVector(vec) {
    vec.x = Math.min(vec.x, width - this.size);
    vec.x = Math.max(vec.x, this.size);
    vec.y = Math.min(vec.y, height - this.size);
    vec.y = Math.max(vec.y, this.size);
  }
  
  checkBorders() {
    if(this.position.x <= this.size || this.position.x >= width - this.size || this.position.y <= this.size || this.position.y >= height - this.size) {
      this.velocity = createVector(0,0);
    }
    
    this.restrainVector(this.position);
  }
}

class Fish extends Creature {
  constructor() {
    super(null, null, null, 30);
  }
  
  render() {
    fill(255);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.size, this.size);
  }
  
  updateAcceleration() {
    this.acceleration = p5.Vector.random2D();
    if(random() > 0.95){
      this.acceleration.mult(100);
    }
    if(random() > 0.98) {
      this.velocity = p5.Vector.random2D();
    }
    this.acceleration.mult(0.02);
  }
}

class Rabbit extends Creature {
  constructor() {
    super();
  }
  
  updateAcceleration() {
    this.acceleration = p5.Vector.random2D();
    if(sin(this.time.x) > 0.99) {
      this.acceleration.mult(5);
    }
    this.acceleration.mult(0.02);
  }
  
  render () {
    fill(255);
    circle(this.position.x, this.position.y, this.size);
  }
}

class Mosquito extends Creature {
  constructor() {
    super();
  }
  
  updateAcceleration(){
    if(random() > 0.9){
      this.acceleration = p5.Vector.random2D();
    }
    else {
      this.acceleration = p5.Vector.mult(this.velocity, -0.01)
    }
  }
  
  render () {
    fill(255);
    triangle(this.position.x - this.size/2, this.position.y + this.size*1/3, this.position.x, this.position.y - this.size*2/3, this.position.x + this.size/2, this.position.y + this.size*1/3)
  }
}

class Bee extends Creature {
  constructor() {
    super(null, null, null, 30);
    this.window = 30;

    this.findNewTarget();
  }
  
  findNewTarget() {
    this.target = createVector(
      random(
        min(width - this.size, this.position.x - this.window),
        max(this.size, this.position.x + this.window)),
      random(
        min(height - this.size, this.position.y - this.window),
        max(this.size, this.position.y + this.window)
      ));
    this.restrainVector(this.target);
  }
  
  updateAcceleration() {
    let direction = p5.Vector.sub(this.target, this.position);
    if (direction.mag() <= 5){
      this.findNewTarget();
    }
    this.acceleration = direction.normalize().mult(0.05);
  }
  
  render () {
    fill(128);
    circle(this.position.x, this.position.y, this.size);
  }
}