class Entities {
  constructor() {
    this.populations = new Array(10);
    this.numPopulations = 0;
  }
  
  update(){
    for(let i = 0; i < this.numPopulations; i++){
      this.populations[i].update();
    }
  }
  
  render(){
    for(let i = 0; i < this.numPopulations; i++){
      this.populations[i].render();
    }
  }
  
  createPopulation(populationSize, classType) {
    this.populations[this.numPopulations] = new Population(populationSize, classType);
    this.numPopulations++;
}
  
  
}

