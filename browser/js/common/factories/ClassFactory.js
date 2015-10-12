app.factory('ClassFactory', function(AvatarFactory, ObstacleFactory, CollectiblesFactory, PersonFactory){

  return{
    //all other factories! together!
    Avatar: AvatarFactory,
    Obstacle: ObstacleFactory,
    Collectible: CollectiblesFactory,
    Person: PersonFactory
  };
});
