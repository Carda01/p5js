let entities;

function setup() {
  createCanvas(600, 600);
  entities = new Entities();
  entities.createPopulation(3, Rabbit);
  entities.createPopulation(5, Fish);
  entities.createPopulation(10, Mosquito);
  entities.createPopulation(10, Bee);

}

function draw() {
  background(255);
  entities.update();
  entities.render();
}
