app.factory('PosFactory', function(TilesizeFactory){
  class Position {
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.type = "Position";
      this.isScreenPos = false;
    }

    dup(){
      return new Position(this.x, this.y);
    }

    addDir(dir, amt){
      console.log('pos.adDir', this, typeof dir)
      switch(dir) {
        case 'up':
          this.y -= amt;
          break;
        case 'right':
          console.log('amt', amt)
          this.x += amt;
          break;
        case 'down':
          console.log('going down', amt)
          this.y += amt;
          break;
        case 'left':
          this.x -= amt;
          break;
      }
      console.log('new pos', this)
      return this;
    }

    isEqual(other){
      return other.x == this.x && other.y == this.y;
    }

    toScreenPos(){
      if(this.isScreenPos) return this.dup();
      else {
        var newScreenPos = new ScreenPosFactory(this.x * TilesizeFactory.TILESIZE, this.y * TilesizeFactory.TILESIZE);
        newScreenPos.isScreenPos = true;

        return newScreenPos;
      }
    }
  }

  return Position;
});