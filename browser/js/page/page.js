app.config(function ($stateProvider) {
    $stateProvider.state('page', {
        url: '/page/:id',
        templateUrl: 'js/page/page.html',
        resolve: {
          page: (PageFactory, $stateParams) => PageFactory.find($stateParams.id)
        },
        controller: 'PageCtrl'
    });
});

app.controller('PageCtrl', function ($scope, AuthService, $state, page, ClassFactory, SPRITES, LevelFactory, TilesizeFactory, spellFactory) {
  $scope.page = page;
  $scope.tools = $scope.page.tools;
  $scope.variables = $scope.page.variables;

  TilesizeFactory.NumTiles = $scope.page.gameboard.length;
  Crafty.load(['/images/sprites.png']);
  Crafty.init(TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles, TilesizeFactory.TILESIZE* TilesizeFactory.NumTiles);
  Crafty.canvas.init();

  Crafty.sprite(64, '/images/sprites.png', SPRITES);

  $scope.level = new LevelFactory($scope.page);
  $scope.spell = new spellFactory($scope.level);

  $scope.resetLevel = function(){

  }

  $scope.runSpell = function(){
    console.log('here?');
    $scope.spell.run();
  }

});
