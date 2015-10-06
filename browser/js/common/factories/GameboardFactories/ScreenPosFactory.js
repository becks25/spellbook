app.factory('ScreenPosFactory', function(PosFactory){
  class ScreenPos extends PosFactory{
    this.isScreenPos = true;
  }

  return ScreenPos;
});