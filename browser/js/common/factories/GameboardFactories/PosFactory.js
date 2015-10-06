app.factory('PosFactory', function(ScreenPosFactory){
  class Position {
    constructor(x, y){
      this.x = x;
      this.y = y;
      this.type = "Position";
    }

    dup(){
      return new Position(this.x, this.y);
    }

    addDir(dir, amt){
      switch(dir) {
        case dir.UP:
          this.y -= amt;
          break;
        case dir.RIGHT:
          this.x += amt;
          break;
        case dir.DOWN:
          this.y += amt;
          break;
        case dir.LEFT:
          this.x -= amt;
          break;
      }
      return this;
    }

    isEqual(other){
      return other.x == this.x && other.y == this.y;
    }

    toScreenPos(){
      if(this.isScreenPos) return this.dup();
      else return new ScreenPosFactory(this.x * tileSize, this.y * tileSize);
    }
  }

  return Position;
});