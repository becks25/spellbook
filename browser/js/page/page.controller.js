/**
 * Created by Austin on 10/13/15.
 */
app.controller('PageCtrl', ($scope, AuthService, $state, page, ClassFactory, SPRITES, LevelFactory, TilesizeFactory, SpellFactory, SpellComponentFactory, SPRITE_AVATARS, orderByFilter, $compile, user, AvatarFactory, PageFactory, allPages, $uibModal, UserFactory, $timeout) => {
    $scope.page = page;
    $scope.allPages = allPages;
    $scope.spellComponents = []; // update from db if saved version is present
    $scope.spellVars = spellVarConstr();
    $scope.spellTools = spellToolConstr();
    $scope.directions = spellDirConstr();
    if(user) $scope.user = user;
    else $scope.user = {character: { picture: 'Giraffe1', name: 'Omri'}}
    TilesizeFactory.NumTiles = $scope.page.gameboard.length;

    $scope.avatar = $scope.user.character.picture
    $scope.text = $compile($scope.page.text)($scope);
    angular.element(document.getElementById('storyText')).append($scope.text);

    $scope.hintRequested = false;

    $scope.getHint = () => {
        $scope.hintRequested = true;
    };
    document.getElementById('cr-stage').style.backgroundImage='url('+$scope.page.boardBackground+')';

    $scope.nextPage;
    $scope.previousPage;

    $scope.findNextPage = () => {
        for (var i = 0; i < $scope.allPages.length; i++){
            if($scope.allPages[i].storyId === $scope.page.storyId){
                var nextPageNumber = $scope.page.pageNumber + 1;
                if($scope.allPages[i].pageNumber === nextPageNumber){
                    $scope.nextPage = $scope.allPages[i];

                }
            }
        }
    };


    $scope.findPreviousPage = () => {
        if($scope.page.pageNumber === 0) return;
        for (var i = 0; i < $scope.allPages.length; i++){
            if($scope.allPages[i].storyId === $scope.page.storyId){
                var lastPageNumber = $scope.page.pageNumber - 1;
                if($scope.allPages[i].pageNumber === lastPageNumber){
                    $scope.previousPage = $scope.allPages[i];

                }
            }
        }
    }

    $scope.findNextPage();
    $scope.findPreviousPage();

    //if there's a next page, get it loaded and ready for the page turn animation
    if($scope.nextPage){
        $scope.nextText = $compile($scope.nextPage.text)($scope);
        angular.element(document.getElementById('nextStoryText')).append($scope.nextText);
        $scope.nextTools = $scope.nextPage.tools.map(tool=> SpellComponentFactory.makeToolObj(tool));
        $scope.nextVars = $scope.nextPage.variables.map(variable => SpellComponentFactory.makeSpellVar(variable));
        document.getElementById('cr-stage-next').style.backgroundImage='url('+$scope.nextPage.boardBackground+')';
        $('#cr-stage-next').css('width', TilesizeFactory.TILESIZE * $scope.nextPage.gameboard.length+'px').css('height', TilesizeFactory.TILESIZE * $scope.nextPage.gameboard.length+'px');
        $scope.turnPage = () => {
            $scope.findNextPage();

            $('.right').addClass('flipped');

            $timeout( () => {
                $('.right-flip').removeClass('flipped');

            }, 1498);

            $timeout( () => {
                PageFactory.find($scope.nextPage._id)
                    .then(function(page){
                     $state.go('page', {id: page._id});
                    });
            }, 2650);

        };
    }

    //if there's a previous page, have it loaded in case someone wants to go back
    if($scope.previousPage){
        $scope.previousText = $compile($scope.previousPage.text)($scope);
        angular.element(document.getElementById('previousStoryText')).append($scope.previousText);
        $scope.prevTools = $scope.previousPage.tools.map(tool=> SpellComponentFactory.makeToolObj(tool));
        $scope.prevVars = $scope.previousPage.variables.map(variable => SpellComponentFactory.makeSpellVar(variable));
        document.getElementById('cr-stage-previous').style.backgroundImage='url('+$scope.previousPage.boardBackground+')';
        $('#cr-stage-previous').css('width', TilesizeFactory.TILESIZE * $scope.previousPage.gameboard.length+'px').css('height', TilesizeFactory.TILESIZE * $scope.previousPage.gameboard.length+'px');
        $scope.goBack = () => {
            $('.left').addClass('flipped');

            $timeout( () => {
                $('.left-flip').removeClass('flipped');

            }, 1498);

            $timeout( () => {
                PageFactory.find($scope.previousPage._id)
                    .then(function(page){
                     $state.go('page', {id: page._id});
                    });
            }, 2650);

        };
    }

    //this is for testing if spell directions is working...
    //$scope.spellDirections = [];
    $scope.spellComponentDirs = [];

    //construct the directions with a function to fix drop and drag bug
    function spellDirConstr() {
        return SpellComponentFactory.possDirections.map(dir => SpellComponentFactory.makeSpellDir(dir));
    };

    //scope.page.tools is an array of strings - .action of the objs
    // takes vars and tools frogit m page model and makes command objs
    // pushes each obj to spellTools arr
    function spellToolConstr() {
        return $scope.page.tools.map(tool=> SpellComponentFactory.makeToolObj(tool));
    };

    function spellVarConstr() {
        //variables are stored as objects
        return $scope.page.variables.map(variable => SpellComponentFactory.makeSpellVar(variable));
    };

    //remove a tool from the spell
    //used on the spell components (x button ng-click)
    $scope.removeFromSpell = (index, loc) => {
        loc.splice(index, 1);
        $scope.resetLevel();
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
            }
        },
        stop: (e, clone) => {

            if (e.target) {
                if ($(e.target).hasClass('first')) {
                    $scope.spellTools = spellToolConstr();
                    $scope.resetLevel();
                }
            }
        },
        connectWith: ".spellComponents, .spellCompExpr"
    });

    //Handles directions and variables
    //determines if dropped in a valid position and updates target object's property
    var dirStuff = [];
    var model = [];
    var dropTargetIndex;
    var newVar={};
    var parentArray;
    $scope.dirConfig = angular.extend({}, baseConfig, {
        //this only runs if valid drop
        update: (e, ui) => {
            // console.log("this is the e item", ui.item.scope());

            if (ui.item.sortable.droptarget.hasClass('first')) {
                ui.item.sortable.cancel();
            } else {
                //set newVar to clone of dragged variable
                newVar = _.cloneDeep(ui.item.scope().tool);
                //sets parent array and drop index to keep track of what to modify
                dropTargetIndex = ui.item.sortable.droptarget.data('index');
                parentArray = ui.item.sortable.droptarget.scope().parent;

                //resets tools arrays to create duplication and ensure spell components are clones
                $scope.spellVars = spellVarConstr();
                $scope.directions = spellDirConstr();

            }
        },
        stop: (e, ui) => {
            //runs on drop
            //this will only run if a tool is being dropped in a valid area
            //set prop on droppee
            //checks that drop target can take this variable
            if(dropTargetIndex>-1 && parentArray[dropTargetIndex].hasOwnProperty(newVar.varType)){
                $scope.spellVars = spellVarConstr();
                $scope.directions = spellDirConstr();
                if (newVar.varType ==='condition') {
                    parentArray[dropTargetIndex][newVar.varType] = newVar;
                }else parentArray[dropTargetIndex][newVar.varType] = newVar.name;

                //reset variables
                newVar = null;
                parentArray = null;
                dropTargetIndex = -1;
                // refresh();
                $scope.resetLevel();
            }
        },
        connectWith: ".spellCompVars"
    });

    //loads board and sprites based on screen size

    //overwrite gameboard hardcording to dynamically change avatar
    for(var i = 0; i < $scope.page.gameboard.length; i++){
        for(var j = 0; j < $scope.page.gameboard[i].length; j++){
            if ($scope.page.gameboard[i][j].length && $scope.page.gameboard[i][j][0].type === "Avatar"){
                $scope.page.gameboard[i][j][0].name = $scope.user.character.picture;
            }
        }
    }

    Crafty.load(['/images/sprites.png']);
    Crafty.init(TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles, TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles);

    Crafty.canvas.init();

    Crafty.sprite(64, '/images/sprites.png', SPRITES);
    Crafty.sprite(64, '/images/SpriteAvatars.png', SPRITE_AVATARS);

    $scope.level = new LevelFactory($scope.page, $scope.nextPage);
    $scope.spell = new SpellFactory($scope.level);

    $scope.resetLevel = function () {
        $scope.spell.reset();
    };

    $scope.grid = new Array(TilesizeFactory.NumTiles * TilesizeFactory.NumTiles);

    $scope.size = TilesizeFactory.TILESIZE + 'px';

    var modalInstance;

    $scope.solved=false;
    $scope.runSpell = argArr => {
        $scope.spell.run(argArr)
            .then(res => {
                if(res){


                    $scope.findNextPage();

                    if($scope.nextPage){

                        modalInstance = $uibModal.open({
                            animation:true,
                            templateUrl: 'js/common/directives/win-modal/win-modal.html',
                            controller: 'ModalCtrl'
                        });
                        $scope.solved = true;

                    }else{
                        modalInstance = $uibModal.open({
                            animation:true,
                            templateUrl: 'js/common/directives/win-modal/book-win-modal.html',
                            controller: 'ModalCtrl'
                        });
                    }

                }
            });

    };

    $scope.stepThrough = (argArr)=> {
        $scope.spell.stepThrough(argArr);
    };



});
