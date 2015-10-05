app.factory('CollectiblesFactory', function(MapObjectFactory){

  class Collectible extends MapObjectFactory {
      this.type = 'Collectible';
      this.holding = false;

      pickUp() {
        this.holding = true;
      }

      give(){
        this.holding = false;
      }
  }

  return Collectible;

  
})