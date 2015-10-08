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

app.controller('PageCtrl', ($scope, AuthService, $state, page, ClassFactory, SPRITES, LevelFactory, TilesizeFactory, SpellFactory, SpellComponentFactory, SPRITE_AVATARS, orderByFilter) => {
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
    }
    //construct the spellTools arr on load
    spellToolConstr();

    var spellVarConstr = () => {

        //variables are stored as strings
        $scope.page.variables.forEach((variable)=> {
            var name = variable.split(' ').join('');
            $scope.spellVars.push({name: name, text: variable, value: false, type: 'variable'})
        });
    };

    spellVarConstr();


    var refresh = () => {
        $scope.$watchCollection('spellComponents', () => {
            $scope.spellTools = orderByFilter($scope.spellTools, ['text']);
        });
        $scope.$watchCollection('spellVars', () => {
            $scope.spellVars = orderByFilter($scope.spellVars, ['text']);
        });
        $scope.$watchCollection('directions', () => {
            $scope.directions = orderByFilter($scope.directions, ['text']);
        });
    };
    refresh();


    $scope.tools = $scope.spellTools.slice();

    var baseConfig = {
        placeholder: "beingDragged",
        tolerance: 'pointer',
        revert: 100
    };

    $scope.toolConfig = angular.extend({}, baseConfig, {
        update: (e, ui) => {
            if (ui.item.sortable.droptarget.hasClass('first')) {
                ui.item.sortable.cancel();
                refresh();
            }
        },
        stop: (e, ui) => {
            if ($(e.target).hasClass('first') &&
                e.target != ui.item.sortable.droptarget[0]) {
                $scope.spellTools = $scope.tools.slice();
                refresh();
            }
        },
        connectWith: ".spellComponents"
    });

    $scope.spellConfig = angular.extend({}, baseConfig, {
        connectWith: ".spellTools"
    });

    //made some changes
    TilesizeFactory.NumTiles = $scope.page.gameboard.length;
    Crafty.load(['/images/sprites.png']);
    Crafty.init(TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles, TilesizeFactory.TILESIZE* TilesizeFactory.NumTiles);

    Crafty.canvas.init();

    Crafty.sprite(64, '/images/sprites.png', SPRITES);
    Crafty.sprite(64, '/images/SpriteAvatars.png', SPRITE_AVATARS);

    $scope.level = new LevelFactory($scope.page);
    $scope.spell = new SpellFactory($scope.level);


    $scope.resetLevel = function () {
        $scope.level.map.resetMap();
    };


    $scope.grid = new Array(TilesizeFactory.NumTiles * TilesizeFactory.NumTiles);


    $scope.size = TilesizeFactory.TILESIZE + 'px';

    $scope.runSpell = argArr => $scope.spell.run(argArr);

    $scope.stepThrough = (argArr)=> {
        $scope.spell.stepThrough(argArr);
    }


});
