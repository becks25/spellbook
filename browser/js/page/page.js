app.config($stateProvider => {
    $stateProvider.state('page', {
        url: '/page/:id',
        resolve: {
            page: (PageFactory, $stateParams) => PageFactory.find($stateParams.id)
        },
        views: {
            main: {
                templateUrl: 'js/page/page.html',
                    controller: 'PageCtrl'

            }
        }
    });

});

app.controller('PageCtrl', ($scope, AuthService, $state, page, ClassFactory, SPRITES, LevelFactory, TilesizeFactory, SpellFactory, SpellComponentFactory, SPRITE_AVATARS, orderByFilter) => {
    $scope.page = page;
    $scope.spellComponents = []; // update from db if saved version is present
    $scope.spellVars = [];
    $scope.spellTools = [];
    $scope.directions = [{
        name: 'up',
        text: 'up',
        value: false,
        type: 'direction'
    }, {
        name: 'down',
        text: 'down',
        value: false,
        type: 'direction'

    },
        {
            name: 'left',
            text: 'left',
            value: false,
            type: 'direction'

        },
        {
            name: 'right',
            text: 'right',
            value: false,
            type: 'direction'
        }];

    //this is for testing if spell directions is working...
    //$scope.spellDirections = [];
    $scope.spellComponentDirs = [];

    //scope.page.tools is an array of strings - .action of the objs
    // takes vars and tools from page model and makes command objs
    // pushes each obj to spellTools arr
    var spellToolConstr = () => {
        $scope.page.tools.forEach((tool)=> {
            var newTool = SpellComponentFactory.makeToolObj(tool);
            $scope.spellTools.push(newTool);
        });
    };
    //construct the spellTools arr on load
    spellToolConstr();

    var spellVarConstr = () => {
        //variables are stored as strings
        $scope.page.variables.forEach((variable)=> {
            var name = variable.split(' ').join('');
            $scope.spellVars.push({name: name, text: variable, value: false, type: 'variable'})
        });
    };
    //construct the spellVars array on load
    spellVarConstr();

    //ensures that tool box can't be rearranged by reordering back to orig order
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

        $scope.$watchCollection('spellComponentDirs', () => {
            $scope.spellComponentDirs = orderByFilter($scope.spellComponentDirs, ['text']);
        });
    };
    refresh();

//save a copy of all tools on the scope
    $scope.tools = $scope.spellTools.slice();

//remove a tool from the spell
    $scope.removeFromSpell = (index, loc) => {
        loc.splice(index, 1);
        console.log(loc)
      };

//remove a variable from the tool
//this will need to change as soon as correctly adding vars to tools
    $scope.removeFromTool = (index) => {
        $scope.spellComponentDirs.splice(index, 1);
      };

    var baseConfig = {
        placeholder: "beingDragged",
        tolerance: 'pointer',
        revert: 100
    };


//add tools to the spell components array
    $scope.toolConfig = angular.extend({}, baseConfig, {
        update: (e, ui) => {
            if (ui.item.sortable.droptarget.hasClass('first')) {
                ui.item.sortable.cancel();
                refresh();
            }
        },
        stop: (e, ui) => {

            if (e.target) {
                if ($(e.target).hasClass('first')) {
                    $scope.spellTools = $scope.tools.slice();
                    $scope.spellComponents = $scope.spellComponents.slice();
                    console.log('made a copy')
                    refresh();
                    console.log('$scope.spellComponents', $scope.spellComponents)
                }
            }
        },
        connectWith: ".spellComponents, .spellCompExpr",
    });



    // $scope.spellConfig = angular.extend({}, baseConfig, {
    //     // connectWith: ".spellTools"
    // });

//this currently only handles adding directions
  //drag directions to tools

 //save a copy of the directions
  $scope.spellDirsBox = $scope.directions.slice();
var dirStuff = [];
var dropTargetIndex;
var newVar={};
  $scope.dirConfig = angular.extend({}, baseConfig, {
        //this only runs if valid drop
        update: (e, ui) => {
          console.log("this is the e item", ui.item.scope());


          if (!ui.item.sortable.droptarget.hasClass('move')) {
                console.log('hi')
                console.log(ui.item.sortable.droptarget)
                ui.item.sortable.cancel();
                refresh();
          } else {
              //set newVar to clone of dragged variable
              newVar = _.cloneDeep(ui.item.scope().tool);
              // console.log('dropTarget', ui.item.sortable.droptarget)
              // console.log('data', ui.item.sortable.droptarget.data('index'))
              dropTargetIndex = ui.item.sortable.droptarget.data('index');
          }
        },
        stop: (e, ui) => {
            //runs on drop
            console.log('e.target', e.target)
            //this will only run if a tool is being dropped
            if ($(e.target).hasClass('spellDirs')) {
                //recopies the list of directions
                // $scope.directions = $scope.spellDirsBox.slice();
                console.log("this is the ui", ui.item)
                
                //set prop on droppee
                $scope.spellComponents[dropTargetIndex].direction = newVar.name;
                console.log('dirstuff', dirStuff)
                // if(thingBeingDroppedOn[newVar.type]){
                //     if(thingBeingDroppedOn[newVar.type].isArray) {
                //       $scope.thingBeingDroppedOn[newVar.type].push(newVar) ;
                //     }
                    // $scope.thingBeingDroppedOn[newVar.type] = newVar.name;
                    // newDir = null;
                    refresh();
                // }
                console.log("Now look", $scope.spellComponents);
            }
        },
        connectWith: ".spellCompVars"
    });


    // $scope.dirComponentConfig = angular.extend({}, baseConfig, {
    //     // connectWith: ".spellDirs"
    // });



    //this handles dragging variables to tools

    //save a copy of the spellVars
  $scope.spellVarsBox = $scope.spellVars.slice();

  $scope.varConfig = angular.extend({}, baseConfig, {
        update: (e, ui) => {
          console.log("this is the ui item", ui.item)
            if (ui.item.sortable.droptarget.hasClass('first')) {
                ui.item.sortable.cancel();
                refresh();
            }
        },
        stop: (e, ui) => {
            if ($(e.target).hasClass('first')) {
                $scope.spellVars = $scope.spellVarsBox.slice();
                refresh();
            }
        },
        connectWith: ".spellComponentDirs"
    });


    $scope.dirComponentConfig = angular.extend({}, baseConfig, {
        connectWith: ".spellVars"
    });

    //made some changes
    TilesizeFactory.NumTiles = $scope.page.gameboard.length;
    Crafty.load(['/images/sprites.png']);
    Crafty.init(TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles, TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles);

    Crafty.canvas.init();

    Crafty.sprite(64, '/images/sprites.png', SPRITES);
    Crafty.sprite(64, '/images/SpriteAvatars.png', SPRITE_AVATARS);

    $scope.level = new LevelFactory($scope.page);
    $scope.spell = new SpellFactory($scope.level);


    $scope.resetLevel = function () {
        $scope.spell.reset();
    };


    $scope.grid = new Array(TilesizeFactory.NumTiles * TilesizeFactory.NumTiles);


    $scope.size = TilesizeFactory.TILESIZE + 'px';

    $scope.runSpell = argArr => $scope.spell.run(argArr);

    $scope.stepThrough = (argArr)=> {
        $scope.spell.stepThrough(argArr);
    };


});
