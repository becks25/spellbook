app.factory('Class', function(AvatarFactory, ObstacleFactory, CollectiblesFactory){

  return{
    //all other factories! together!
    Avatar: AvatarFactory,
    Obstacle: ObstacleFactory,
    Collectible: CollectiblesFactory
  };
});