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

app.controller('PageCtrl', ($scope, AuthService, $state, page, ClassFactory, SPRITES, LevelFactory, TilesizeFactory, SpellFactory, SpellComponentFactory) => {
  $scope.page = page;
  $scope.spellComponents = []; // update from db if saved version is present
  $scope.spellTools = [{
    name: 'UP',
    text: 'up',
    value: false,
  },{
    name: 'DOWN',
    text: 'down',
    value: false,
  },
  {
    name: 'LEFT',
    text: 'left',
    value: false,
  },
  {
    name: 'RIGHT',
    text: 'right',
    value: false,
  }];

  //scope.page.tools is an array of strings - .action of the objs
  // takes vars and tools from page model and makes command objs
  // pushes each obj to spellTools arr
  var spellToolConstr = () => {
    $scope.page.tools.forEach((tool)=>{
      console.log('tool in forEach', tool)
      var newTool = SpellComponentFactory.makeToolObj(tool);
      $scope.spellTools.push(newTool);
    });
  };
  //construct the spellTools arr on load
  spellToolConstr();

  var spellVarConstr = () => {
    //variables are stored as strings
    $scope.page.variables.forEach((variable)=>{
      var name = variable.split(' ').join('');
      $scope.spellTools.push({name: name, text: variable, value: false})
    });
  };
  spellVarConstr();

  $scope.sortableOptions = {
    stop: function(e, ui){
      var spellItem = ui.item.scope().tool;
      $scope.spellComponents.push(spellItem);
      console.log('tools', $scope.spellTools)
      console.log('comp', $scope.spellComponents)
    }
  }



  TilesizeFactory.NumTiles = $scope.page.gameboard.length;
  Crafty.load(['/images/sprites.png']);
  Crafty.init(TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles, TilesizeFactory.TILESIZE* TilesizeFactory.NumTiles);
  Crafty.canvas.init();

  Crafty.sprite(64, '/images/sprites.png', SPRITES);

  $scope.level = new LevelFactory($scope.page);
  $scope.spell = new SpellFactory($scope.level);

  $scope.resetLevel = function(){

  }

  $scope.runSpell = function(){
    console.log('here?');
    $scope.spell.run();
  }

});
