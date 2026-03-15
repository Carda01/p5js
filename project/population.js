class Population {
  constructor(num_creatures, classType) {
    this.num_creatures = num_creatures;
    this.creatures = new Array(num_creatures);
    for (let i = 0; i < num_creatures; i++) {
      this.creatures[i] = new classType();
    }
  }

  update() {
    for (let i = 0; i < this.num_creatures; i++) {
      this.creatures[i].update();
    }
  }

  render() {
    for (let i = 0; i < this.num_creatures; i++) {
      this.creatures[i].render();
    }
  }
}