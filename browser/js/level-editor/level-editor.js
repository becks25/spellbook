app.config($stateProvider => {
	$stateProvider.state('add',{
		url: '/add/:storyId/page',
        data: {
          adminOnly: true,
          authenticate: true
        },
        resolve: {
            // story: (StoryFactory, $stateParams) => StoryFactory.find($stateParams.storyId),
            user: (UserFactory, AuthService, $stateParams) => {
                return AuthService.getLoggedInUser()
                .then(user => {
                    console.log('in resolve', $stateParams, user);
                    return UserFactory.find(user._id);

                });
              }
        },
        views: {
            main: {
                templateUrl: 'js/level-editor/level-editor.html',
                    controller: 'levelEditCtrl'

            }
        }
	});
});

app.controller('levelEditCtrl', ($scope, AuthService, $state, $stateParams, ClassFactory, SPRITES, LevelFactory, TilesizeFactory, SpellFactory, SpellComponentFactory, SPRITE_AVATARS, orderByFilter, $compile, user, AvatarFactory, PageFactory, $uibModal, StoryFactory, CONCEPTS, GAMEBOARD_BACKGROUNDS) => {

	var boardPlaceholder = [
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
	];

	$scope.user = user;
  $scope.toolsPoss = SpellComponentFactory.possTools;
  $scope.dirsPoss = SpellComponentFactory.possDirections;
  $scope.spellTools = []; // visible in toolbox
  $scope.spellVars = [];
  $scope.directions = [];
  $scope.spellComponents = []; //used for storing dragged requirements
  $scope.varTypes = ['person', 'variable', 'condition'];
  $scope.varFnTypes = ['holding', 'match', 'true', 'false'];
  $scope.newVar = {};
  $scope.page = {
    story:$stateParams.storyId,
    text: '',
    boardBackground: 'images/flower-field.png',
    gameboard: boardPlaceholder,
    hint: '',
    requirements: {},
    pageNumber: 0,
  };
  $scope.level = new LevelFactory($scope.page);
  $scope.spell = new SpellFactory($scope.level);
  $scope.possSprites = _.keys(SPRITES).map(sprite=>{
      return {name:sprite, imgPos:SPRITES[sprite], imgUrl: 'images/sprites.png'};
    });
  _.keys(SPRITE_AVATARS).forEach(sprite=>$scope.possSprites.push({name:sprite, imgPos:SPRITE_AVATARS[sprite], imgUrl: 'images/SpriteAvatars.png'}));
  //move the empty sprite to the end
  $scope.possSprites.push($scope.possSprites.shift());
  $scope.newSprite = {
    type: null,
    name: null,
    varName: null,
    match: null,
    pos: [null, null]
  };
  // $scope.newSpritePos = [null, null];
  $scope.savedSprites = [];
  $scope.backgrounds = GAMEBOARD_BACKGROUNDS;
  $scope.makingNewLevel = true;
  var toolsForRequirements = ['pickUp', 'give', 'ask', 'tell'];
  //used to keep track of vars that should be refreshed in tool box and to save pg
  //array members have the same type as poss arrays (str, str, obj)
  var saved ={
    'tool': [],
    'direction': [], //this might not need to be in here
    'variable': [], //objects instead of strings
  };

  $scope.openSections = {info: true, board: true, reqs: false}
  //sets newVar to empty version on load
  clearNewVar();

  $scope.avatarPos = [1,1];

  $scope.savePage = () =>{
    //page obj already has story, text, hint, background, gameboard
    $scope.page.text = '<p>' + $('#page-text').val().replace(/\</g, '&#60').replace(/\>/g,'&#62').replace(/\"/g, '&#34').replace(/\//g, '&#47').replace(/\{/g,'&#123').replace(/\}/g,'&#125').replace(/\[/g,'&#91').replace(/\]/g,'&#93').replace(/\|/g,'&#124').replace(/\n/g, '</p><p>') + '</p>'

    $scope.page.concepts = _.keys($scope.concepts).filter(concept=>$scope.concepts[concept]);
    $scope.page.tools = saved.tool;
    $scope.page.directions = saved.direction;
    $scope.page.variables = saved.variable;
    //set req from spell box
    $scope.page.requirements = $scope.level.constructReqs($scope.spellComponents)
    //set gameboard with objs
    //find pg num

    StoryFactory.find($stateParams.storyId)
    .then(story => story.getAllPages($stateParams.storyId))
    .then(pages => {
      $scope.page.pageNumber = pages.length;
      return PageFactory.create($scope.page);
    }).then(page => {
      console.log('made', page)
      $state.go('add', {storyId: $stateParams.storyId});
    });
  };

  $scope.boardLength = ()=>_.range(1, $scope.page.gameboard.length+1);

  //add sprite to board and saved arr
  $scope.saveSprite = ()=>{
    // if ($scope.newSprite.varName) sprite.varName = $scope.newSprite.varName;
    // if ($scope.newSprite.match) sprite.match = $scope.newSprite.match;
    // $scope.page.gameboard[$scope.newSpritePos.x-1][$scope.newSpritePos.y-1].push($scope.newSprite);
    // $scope.newSprite.pos = $scope.newSpritePos;
    $scope.newSprite.imgPos = $scope.newSprite.imgPos;

    $scope.savedSprites.push($scope.newSprite);
    // console.log('gameboard', $scope.page.gameboard)
    $scope.newSprite = {
      type: null,
      name: null,
      varName: null,
      match: null,
      pos: [null, null]
    };
    // $scope.newSpritePos = {x: null, y: null};
    $scope.resetMap();
  };
  $scope.selectImg = (possSpr)=>{
    $scope.newSprite.name = possSpr.name;
    $scope.newSprite.imgUrl = possSpr.imgUrl;
    $scope.newSprite.imgPos = possSpr.imgPos;
  };
  $scope.removeSprite = (sprite, index)=>{
    $scope.savedSprites.splice(index, 1);
    $scope.resetMap();

    // console.log(_.get(sprite, $scope.page.gameboard));
    // console.log('removing', $scope.page.gameboard)
  };


  //stores temp new var before saving
  function clearNewVar(){
    $scope.newVar = {
      text: '',
      varType: '',
      fnType: '',
      arg: ''
    };
  }

    //these functions construct the lists of variables that will be shown on the page
    //can be called to reset the lists in the tool box after item is dragged out
    var makeSpellTool = (selected) => {
        var newTool = SpellComponentFactory.makeToolObj(selected);
        $scope.spellTools.push(newTool);
        saved.tool.push(selected);
    };
    var makeSpellDir = (selected) => {
      	var newDir = SpellComponentFactory.makeSpellDir(selected);
        $scope.directions.push(newDir);
        saved.direction.push(selected);
  	};
  	var makeSpellVar = (newVarObj)=> {
      saved.variable.push(newVarObj);
      newVarObj = SpellComponentFactory.makeSpellVar(newVarObj);
      $scope.spellVars.push(newVarObj);
  	};

  	//removes an item from spellComponents
  	//called by the x buttons in the requirements box
  	$scope.removeItem = (index, loc)=>{
  		loc.splice(index, 1);
  	};

    $scope.possConcepts = CONCEPTS;
    $scope.concepts = {};
    $scope.toggleConcept = (concept, e) => {
        e.stopPropagation();
        $scope.concepts[concept] = !$scope.concepts[concept];
    };
    $scope.possConcepts.forEach(concept => $scope.concepts[concept] = true);

    //for adding and removing str/str
    $scope.addConcept = (concept, index, addLoc, removeLoc) => {
      addLoc.push(concept);
      removeLoc.splice(index, 1);
    };

  	$scope.addTool = (tool, index, type)=>{
      console.log('creating', tool, index, type)
      switch (type){
        case 'tool':
          $scope.toolsPoss.splice(index, 1)
          return makeSpellTool(tool);
        case 'direction':
          $scope.dirsPoss.splice(index, 1)       
          return makeSpellDir(tool);
        case 'variable':
        if(!tool.text) return;
          makeSpellVar(tool);
          clearNewVar();
      }
    };

    $scope.removeToolOrDir = (tool, index, loc)=>{
      //remove from scope.spell_____
      loc.splice(index, 1);
      //remove from saved[tool.type]
      var foundIndex = saved[tool.type].indexOf(tool.name);
      saved[tool.type].splice(foundIndex, 1);
      //add tool.name to poss list
      tool.type === 'tool' ? $scope.toolsPoss.push(tool.name) : $scope.dirsPoss.push(tool.name);
    };

var baseConfig = {
        placeholder: "beingDragged",
        tolerance: 'pointer',
        revert: 100
    };

    //add tools to the spell components array
    $scope.toolConfig = angular.extend({}, baseConfig, {
        update: (e, ui) => {
            // only moves a tool to the spell box if it is an action for the page requirements
            if (ui.item.sortable.droptarget.hasClass('first') || (ui.item.scope() && !toolsForRequirements.some(tool=> tool === ui.item.scope().tool.action))) {
                ui.item.sortable.cancel();
            }
        },
        stop: (e, clone) => {

            if (e.target) {
                if ($(e.target).hasClass('first')) {
                    $scope.spellTools = saved.tool.map(tool=>SpellComponentFactory.makeToolObj(tool));
                }
            }
        },
        connectWith: ".spellComponents"
    });

    $scope.resetMap = ()=>{
      var gameboard = _.cloneDeep(boardPlaceholder);
      //construct 3-d array
      gameboard[$scope.avatarPos[0]-1][$scope.avatarPos[1]-1].push({type: 'Avatar', name: 'WizardGirl1'});
      $scope.savedSprites.forEach(sprite=>{
        var mapObj = {type: sprite.type, name: sprite.name};
        if(sprite.varName) mapObj.varName = sprite.varName;
        if(sprite.match) mapObj.match = sprite.match;
        gameboard[sprite.pos[0]-1][sprite.pos[1]-1].push(mapObj);
      });
      Crafty("2D").each(function(i) {
          this.destroy();
        });
      $scope.page.gameboard = gameboard;
      $scope.level.map.load(gameboard);

    };

    $scope.setBoard = ()=>{
    
        document.getElementById('cr-stage').style.backgroundImage='url('+$scope.page.boardBackground+')';
        $scope.resetMap();
        console.log('board', $scope.page.gameboard)
    };

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
                console.log(ui.item.sortable.droptarget)
                ui.item.sortable.cancel();
                // refresh();
            } else {
                //set newVar to clone of dragged variable
                newVar = _.cloneDeep(ui.item.scope().tool);
                //sets parent array and drop index to keep track of what to modify
                dropTargetIndex = ui.item.sortable.droptarget.data('index');
                parentArray = ui.item.sortable.droptarget.scope().parent;

                //resets tools arrays to create duplication and ensure spell components are clones
                $scope.spellVars = saved.variable.map(variable=>SpellComponentFactory.makeSpellVar(variable));
                //refresh();
                // $scope.resetLevel();
            }
        },
        stop: (e, ui) => {
            //runs on drop
            //this will only run if a tool is being dropped in a valid area
            //set prop on droppee
            //checks that drop target can take this variable
            if(dropTargetIndex>-1 && parentArray[dropTargetIndex].hasOwnProperty(newVar.varType)){
                $scope.spellVars = saved.variable.map(variable=>SpellComponentFactory.makeSpellVar(variable));
                    console.log('newVar');

                parentArray[dropTargetIndex][newVar.varType] = newVar.name;

                //reset variables
                newVar = null;
                parentArray = null;
                dropTargetIndex = -1;
                // refresh();
            }
        },
        connectWith: ".spellCompVars"
    });




//loads board and sprites based on screen size
    document.getElementById('cr-stage').style.backgroundImage='url('+$scope.page.boardBackground+')';

    TilesizeFactory.NumTiles = $scope.page.gameboard.length;
    Crafty.load(['/images/sprites.png']);
    var tileSize = TilesizeFactory.TILESIZE;
    Crafty.init(tileSize * TilesizeFactory.NumTiles, tileSize * TilesizeFactory.NumTiles);

    Crafty.canvas.init();
    //need to load sprites on to map

    Crafty.sprite(64, '/images/sprites.png', SPRITES);
    Crafty.sprite(64, '/images/SpriteAvatars.png', SPRITE_AVATARS);

    $scope.grid = new Array(TilesizeFactory.NumTiles * TilesizeFactory.NumTiles);

    $scope.size = tileSize + 'px';

    $scope.resetMap();


});
