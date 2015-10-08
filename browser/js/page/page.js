app.config( $stateProvider => {
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
  $scope.spellVars = [];
  $scope.spellTools = [];
  $scope.directions = [{
    name: 'UP',
    text: 'up',
    value: false,
    type: 'direction'
  },{
    name: 'DOWN',
    text: 'down',
    value: false,
    type: 'direction'

  },
  {
    name: 'LEFT',
    text: 'left',
    value: false,
    type: 'direction'

  },
  {
    name: 'RIGHT',
    text: 'right',
    value: false,
    type: 'direction'

  }];

  //scope.page.tools is an array of strings - .action of the objs
  // takes vars and tools from page model and makes command objs
  // pushes each obj to spellTools arr
  var spellToolConstr = () => {
    $scope.page.tools.forEach((tool)=>{
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
      $scope.spellVars.push({name: name, text: variable, value: false, type: 'variable'})
    });
  };
  spellVarConstr();

  $scope.sortableOptions = {
    stop: function(e, ui){
      var spellItem = ui.item.scope().tool;
      $scope.spellComponents.push(spellItem);
    }
  };



  TilesizeFactory.NumTiles = $scope.page.gameboard.length;
  Crafty.load(['/images/sprites.png']);
  Crafty.init(TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles, TilesizeFactory.TILESIZE* TilesizeFactory.NumTiles);
  Crafty.canvas.init();

  Crafty.sprite(64, '/images/sprites.png', SPRITES);

  $scope.level = new LevelFactory($scope.page);
  $scope.spell = new SpellFactory($scope.level);

  $scope.resetLevel = function(){
    $scope.level.map.resetMap();
  };


  $scope.grid = new Array(TilesizeFactory.NumTiles * TilesizeFactory.NumTiles);
  // document.querySelectorAll('.square').forEach( elem => {
  //   elem.style.height = TilesizeFactory.TILESIZE + 'px';
  //   elem.style.width = TilesizeFactory.TILESIZE + 'px';
  // })

  $scope.size = TilesizeFactory.TILESIZE + 'px';

  $scope.runSpell = (argArr)=>{
    $scope.spell.run(argArr);
  }

  $scope.stepThrough = (argArr)=>{
    $scope.spell.stepThrough(argArr);
  }
    

});
