app.config($stateProvider => {
	$stateProvider.state('levelEditor',{
		url: '/add',
        resolve: {
            // story: (StoryFactory, $stateParams) => StoryFactory.find($stateParams.id),
            user: (UserFactory, AuthService) => {
                return AuthService.getLoggedInUser()
                .then(user => {
                    console.log(user);
                    return UserFactory.find(user._id);

                })
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

app.controller('levelEditCtrl', ($scope, AuthService, $state, ClassFactory, SPRITES, LevelFactory, TilesizeFactory, SpellFactory, SpellComponentFactory, SPRITE_AVATARS, orderByFilter, $compile, user) => {
	// $scope.story = story;
	var boardPlaceholder = [
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
		[[],[],[],[],[]],
	];

	$scope.current = 'select concepts'
	$scope.user = user;
	$scope.page = {
		// story:$scope.story._id,
		text: '',
		boardBackground: 'images/flower-field.png',
		gameboard: boardPlaceholder,
		hint: '',

	};
	$scope.toolsPoss = SpellComponentFactory.possTools;
    $scope.dirsPoss = ['up', 'down', 'right', 'left']; 
	$scope.spellTools = [];
	$scope.spellVars = [];
	$scope.directions = [];
	$scope.possConcepts = SpellComponentFactory.possConcepts;
	$scope.concepts = [];
	//used to keep track of vars that should be refreshed in tool box
	var saved ={
		'tools': [],
		'vars': [],
		'dirs': []
	};

	
console.log('tools pos', $scope.toolsPoss)
    //these functions construct the lists of variables that will be shown on the page
    //can be called to reset the lists in the tool box after item is dragged out
    var makeSpellTool = (selected) => {
        var newTool = SpellComponentFactory.makeToolObj(selected);
        $scope.spellTools.push(newTool);
    };
    var makeSpellDir = (selected) => {
      	$scope.directions.push({
	        name: selected,
	        text: selected,
	        type: 'direction',
	        varType: 'direction'
	    });
  	};
  	var makeSpellVar = (newVarObj)=> {
  		$scope.spellVars.push(newVarObj);
  	};

  	//removes an item from a scope array 
  	//called by the x buttons
  	$scope.removeItem = (index, loc)=>{
  		loc.splice(index, 1);
  	};
  	$scope.savePage = ()=>{
  		console.log('saving page', $scope.page);
  	};

  	$scope.addConcept = (concept, index, addLoc, removeLoc, tool, alsoRemove)=>{
  		if (alsoRemove){
  			//remove from scope var and saved
  		}
  		else if(tool) {
  			console.log('yes', tool)
  			saved[tool].push(concept);
  			if (removeLoc) removeLoc.splice(index, 1);
  			switch (tool){
  				case 'tools':
  					makeSpellTool(concept);
  					break;
  				case 'vars':
  					makeSpellVar(concept);
  					break;
  				case 'dirs':
  					makeSpellDir(concept);
  					break;
  			}

  		} else {
	  		concept.name ? addLoc.push(concept) : addLoc.push(concept);
	  		removeLoc.splice(index, 1);
	  	}
  	};

//loads board and sprites based on screen size
    TilesizeFactory.NumTiles = $scope.page.gameboard.length;
    Crafty.load(['/images/sprites.png']);
    Crafty.init(TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles, TilesizeFactory.TILESIZE * TilesizeFactory.NumTiles);

    Crafty.canvas.init();

    Crafty.sprite(64, '/images/sprites.png', SPRITES);
    Crafty.sprite(64, '/images/SpriteAvatars.png', SPRITE_AVATARS);

    $scope.level = new LevelFactory($scope.page);
    $scope.spell = new SpellFactory($scope.level);

    $scope.grid = new Array(TilesizeFactory.NumTiles * TilesizeFactory.NumTiles);

    $scope.size = TilesizeFactory.TILESIZE + 'px';

    // $scope.runSpell = argArr => $scope.spell.run(argArr);

    // $scope.stepThrough = (argArr)=> {
    //     $scope.spell.stepThrough(argArr);
    // };



});