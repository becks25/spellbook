app.factory('CollectiblesFactory', function(MapObjectFactory){

  class Collectible extends MapObjectFactory {
      constructor(name, position, action, variables){
      super(name, position, action, variables)
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