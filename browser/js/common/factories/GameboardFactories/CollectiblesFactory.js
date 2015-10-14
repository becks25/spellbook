app.factory('CollectiblesFactory', function(MapObjectFactory){

  class Collectible extends MapObjectFactory {
      constructor(name, position, action, varName, variables, match){
      super(name, position, action, varName, variables, match);
      this.type = 'Collectible';
      this.holding = false;
      }
      pickUp() {
        this.holding = true;
      }

      give(){
        this.holding = false;
      }
  }

  return Collectible;

  
})