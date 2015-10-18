app.factory('LevelFactory', function(PageFactory, UserFactory, AuthService, MapFactory){
  class Level {
    constructor(page, nextPage){
      this.page = page;
      this.nextPage = nextPage;
      this.map = new MapFactory(page.gameboard);
      console.log('page in level fact', this.page)
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
      console.log('resetting', this.requirements)
      var level = this;
      resetWinLoseReq('win');
      resetWinLoseReq('lose');
    
      //resets the keys in win or lose conditions
      function resetWinLoseReq(condType){ //condType is 'win' or 'lose'
        if(level.requirements[condType]) {
          for(var action in level.requirements[condType]){
            for (var variable in level.requirements[condType][action]){
              for (var person in level.requirements[condType][action][variable]){
                level.requirements[condType][action][variable][person] = false;
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
      var solved = checkWinLoseReqs('win')
      if(solved) solved = checkWinLoseReqs('lose');
      if (solved && this.requirements.spellLength) solved = this.requirements.spellLength <= spellLength;
      if (solved && this.requirements.numMoves) solved = this.requirements.numMoves <= spellMoves;
      return solved;

  
    function checkWinLoseReqs(condType){
      //loop through requirements and verify they are true
      if (level.requirements[condType]) {
        for (var action in level.requirements[condType]){
          for (var variable in level.requirements[condType][action]){
            for (var person in level.requirements[condType][action][variable]){
              if (condType === 'win') {
                if (level.requirements[condType][action][variable][person] === false) return false;
              }else if (condType === 'lose') if (level.requirements[condType][action][variable][person] === true) return false;
            }
          }
        }
      }
      return true;
    }
  }

    //check and update requirements
    updateReq(action, variable, person){     
      if (_.has(this.requirements, 'win', action, variable, person)){
          if(this.requirements['win'] && this.requirements['win'][action] && this.requirements['win'][action][variable] && this.requirements['win'][action][variable].hasOwnProperty(person)){
            this.requirements['win'][action][variable][person] = true;
          } else this.requirements['lose'][action][variable][person] = true;
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

    constructReqs(winArr){
      var level = this;
      constructReqs('win', winArr);
      return this.requirements;

      //constructs req dictionary object from spell arr
      function constructReqs(condType, spellArr){
        //spellArr will never have nested objects
        spellArr.forEach(component => {
          //this could probably be refactored with _.merge
          if (!level.requirements[condType]) level.requirements[condType] = {};
          if (!level.requirements[condType][component.action]) level.requirements[condType][component.action] = {};
          if(!level.requirements[condType][component.action][component.variable]) level.requirements[condType][component.action][component.variable] = {};
          if (!component.person) level.requirements[condType][component.action][component.variable] = {'noOne': false};
          else level.requirements[condType][component.action][component.variable][component.person] = false;
        });
      }
    }

  }

  return Level;


});
