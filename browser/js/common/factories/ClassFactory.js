app.factory('ClassFactory', function(AvatarFactory, ObstacleFactory, CollectiblesFactory, LevelFactory){

  return{
    //all other factories! together!
    Avatar: AvatarFactory,
    Obstacle: ObstacleFactory,
    Collectible: CollectiblesFactory,
    Level: LevelFactory
  };
});
