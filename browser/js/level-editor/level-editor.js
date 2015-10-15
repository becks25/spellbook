app.config($stateProvider => {
	$stateProvider.state('levelEditor',{
		url: '/add',
        resolve: {
            // story: (StoryFactory, $stateParams) => StoryFactory.find($stateParams.storyId),
            user: (UserFactory, AuthService) => {
                return AuthService.getLoggedInUser()
                .then(user => {
                    console.log(user);
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

app.controller('levelEditCtrl', ($scope, AuthService, $state, $stateParams, ClassFactory, SPRITES, LevelFactory, TilesizeFactory, SpellFactory, SpellComponentFactory, SPRITE_AVATARS, orderByFilter, $compile, user, AvatarFactory, PageFactory, $uibModal) => {
	// $scope.story = story;

	var boardPlaceholder = [
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
	];

	$scope.user = user;
  $scope.possConcepts = SpellComponentFactory.possConcepts;
  $scope.toolsPoss = SpellComponentFactory.possTools;
  $scope.dirsPoss = SpellComponentFactory.possDirections; 
  $scope.spellTools = []; // visible in toolbox
  $scope.spellVars = [];
  $scope.directions = [];
  $scope.concepts = []; //concepts user has added to pg
  $scope.spellComponents = []; //used for storing dragged requirements
  $scope.varTypes = ['person', 'variable', 'condition'];
  $scope.varFnTypes = ['holding', 'match', 'true', 'false'];
  $scope.newVar;
  $scope.page = { 
    story:$stateParams.storyId,
    text: '',
    boardBackground: 'images/flower-field.png',
    gameboard: boardPlaceholder,
    hint: '',
    concepts: $scope.concepts,
    requirements: {},
    pageNumber: 0,
  };
  $scope.level = new LevelFactory($scope.page);
  $scope.spell = new SpellFactory($scope.level);
  var toolsForRequirements = ['pickUp', 'give', 'ask', 'tell'];
  //used to keep track of vars that should be refreshed in tool box and to save pg
  //array members have the same type as poss arrays (str, str, obj)
  var saved ={
    'tools': [],
    'dirs': [], //this might not need to be in here
    'vars': [], //objects instead of strings
  };
  //sets newVar to empty version on load
  clearNewVar();

  $scope.savePage = ()=>{
    //page obj already has story, text, hint, background, gameboard
    $scope.page.tools = saved.tools;
    $scope.page.directions = saved.dirs;
    $scope.page.variables = saved.vars;
    console.log('spellComponents', $scope.spellComponents)
    //set req from spell box
    $scope.page.requirements = $scope.level.constructReqs($scope.spellComponents)
    //set gameboard with objs
    //find pg num
    console.log('saving page', $scope.page);
  };
  
  //stores temp new var before saving
  function clearNewVar(){
    $scope.newVar = {
      text: '', 
      varType: '',
      fnType: '',
      arg: ''
    };
  };

    //these functions construct the lists of variables that will be shown on the page
    //can be called to reset the lists in the tool box after item is dragged out
    var makeSpellTool = (selected) => {
        var newTool = SpellComponentFactory.makeToolObj(selected);
        $scope.spellTools.push(newTool);
        saved.tools.push(selected);
    };
    var makeSpellDir = (selected) => {
      	var newDir = SpellComponentFactory.makeSpellDir(selected);
        $scope.directions.push(newDir);
        saved.dirs.push(selected);
  	};
  	var makeSpellVar = (newVarObj)=> {
      newVarObj = SpellComponentFactory.makeSpellVar(newVarObj);
  		$scope.spellVars.push(newVarObj);
      saved.vars.push(newVarObj);
  	};

  	//removes an item from spellComponents 
  	//called by the x buttons in the requirements box
  	$scope.removeItem = (index, loc)=>{
  		loc.splice(index, 1);
  	};

    //for adding and removing str/str
    $scope.addConcept = (concept, index, addLoc, removeLoc) => {
      addLoc.push(concept);
      removeLoc.splice(index, 1);
    };

  	$scope.addTool = (tool, index, type)=>{
      switch (type){
        case 'tool':
          return makeSpellTool(tool);
        case 'direction':
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
      var foundIndex = saved[tool.type].indexOf(tool.name)
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
          console.log('running update', ui.item, ui.item.scope())
            // only moves a tool to the spell box if it is an action for the page requirements
            if (ui.item.sortable.droptarget.hasClass('first') || (ui.item.scope() && !toolsForRequirements.some(tool=> tool === ui.item.scope().tool.action))) {
                ui.item.sortable.cancel();
            }
        },
        stop: (e, clone) => {

            if (e.target) {
                if ($(e.target).hasClass('first')) {
                    $scope.spellTools = saved.tools.map(tool=>SpellComponentFactory.makeToolObj(tool));                    
                }
            }
        },
        connectWith: ".spellComponents"
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
                $scope.spellVars = saved.vars.map(variable=>SpellComponentFactory.makeSpellVar(variable));                    
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
                $scope.spellVars = saved.vars.map(variable=>SpellComponentFactory.makeSpellVar(variable));                    
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
    TilesizeFactory.NumTiles = $scope.page.gameboard.length;
    Crafty.load(['/images/sprites.png']);
    Crafty.init(TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles, TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles);

    Crafty.canvas.init();

    Crafty.sprite(64, '/images/sprites.png', SPRITES);
    Crafty.sprite(64, '/images/SpriteAvatars.png', SPRITE_AVATARS);

    $scope.grid = new Array(TilesizeFactory.NumTiles * TilesizeFactory.NumTiles);

    $scope.size = TilesizeFactory.TILESIZE + 'px';

    // $scope.runSpell = argArr => $scope.spell.run(argArr);

    // $scope.stepThrough = (argArr)=> {
    //     $scope.spell.stepThrough(argArr);
    // };



});