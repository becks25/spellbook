app.factory('Class', function(AvatarFactory, ObstacleFactory){

  return{
    //all other factories! together!
    Avatar: AvatarFactory,
    Obstacle: ObstacleFactory
  };
});