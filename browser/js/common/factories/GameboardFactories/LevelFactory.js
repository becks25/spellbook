app.factory('LevelFactory', function(PageFactory, UserFactory, AuthService, MapFactory){
  class Level {
    constructor(page, nextPage){
      this.page = page;
      this.nextPage = nextPage;
      this.map = new MapFactory(page.gameboard);
      this.requirements = this.page.requirements;
      this.hint = page.hint;
      this.concepts = page.concepts;
      this.points = 50;
      this.won = false;

      //the background for the challenge, not the story
      this.background = page.image;
    }

    resetMap(){
      this.map.resetMap();
    }

    // requirements is structured as:
    // { win: {
      //  requirementA: {
      //    actionA: {val:false},
      //    actionB: {val:false}
      //  },
      //  lose: {},
      //  length: {},
    //}}

    //resets req objs
    resetRequirements(){ 
      var level = this;
      console.log('this outside', level)
      resetWinLoseReq('win');
      resetWinLoseReq('lose');
    
      //resets the keys in win or lose conditions
      function resetWinLoseReq(condType){ //condType is 'win' or 'lose'
            console.log('this inside fn', level)
        if(level.requirements[condType]) {
          for(var req in level.requirements[condType]){
            for (var action in level.requirements[condType][req]){
              for (var val in level.requirements[condType][req][action]){
                level.requirements[condType][req][action][val] = false;
              }
            }
          }
        }
      }
    }

    //checks req obj to seeif all condtions are met
    // checks win reqs for false, lose reqs for true, length and numMoves
    isSolved(spellMoves, spellLength){
      var level = this;
      var solved = checkWinLoseReqs('win');
      solved = checkWinLoseReqs('lose');
      if (this.requirements.spellLength) solved = this.requirements.spellLength <= spellLength;
      if (this.requirements.numMoves) solved = this.requirements.numMoves <= spellMoves;
      return solved;
            console.log('this inside fn', level)

  
    function checkWinLoseReqs(condType){
      //loop through requirements and verify they are true
      if (!level.requirements[condType]) {
        for (var req in level.requirements[condType]){
          for (var action in level.requirements[condType][req]){
            for (var val in level.requirements[condType][req][action]){
              // console.log('val', level.requirements[req][action][val])
              if (condType === 'win') if (level.requirements[condType][req][action][val] === false) return false;
              else if (condType === 'lose') if (level.requirements[condType][req][action][val] === true) return false;
            }
          }
        }
      }
      return true;
    }
  }

    //check and update requirements
    updateReq(variable, action, val){
        if (_.has(this.requirements, variable, action, val)){
          console.log('!!!found it')
           // this.requirements[reqType][variable][action][val] = true;

        }
    }

    win(){
    //get the currently logged in user
      return AuthService.getLoggedInUser()
        .then(user => {
          if(!user) return;
          return UserFactory.find(user._id)
            .then(userInfo => {
              //remove the current page from their unfinishedPages
              userInfo.unfinishedPages = _.remove(userInfo._unfinishedPages, page=>{
                if(!page) return;
                return page.toString() === this.page._id.toString();
              });
                            // var i = userInfo.unfinishedPages.indexOf(this.page._id);
              // userInfo.unfinishedPages.splice(i, 1);

              //add the next page to their unfinished Pages


              //update mastery
              userInfo.mastery.forEach(concept =>{
                if(this.concepts.indexOf(concept.topic) !== -1){
                  concept.pointsEarned += this.points;
                  concept.pointsPossible += 50;
                }
              });

              if(this.nextPage){
                userInfo.unfinishedPages.push(this.nextPage);
                userInfo._unfinishedPages.push(this.nextPage._id);
              }else userInfo._completedStories.push(this.page.storyId);

              return UserFactory.update(userInfo._id, {mastery: userInfo.mastery, unfinishedPages: userInfo._unfinishedPages, completedStories: userInfo._completedStories});
            })
            .then(saved => {
              this.won = true;
              return true; 
            });
        });

    }

    lose(){
      if(this.points > 10){
        this.points = this.points-5;
      }

      return false;
    }

  }

  return Level;


});