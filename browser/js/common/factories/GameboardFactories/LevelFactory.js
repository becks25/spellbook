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
    // { requirementA: {
    //    actionA: {val:false},
    //    actionB: {val:false}
    //}}
    resetRequirements(){
      for(var req in this.requirements){
        for (var action in this.requirements[req]){
          for (var val in this.requirements[req][action]){
            this.requirements[req][action][val] = false;
          }
        }
      }

    }

    isSolved(){
    //loop through requirements and verify they are true
    for (var req in this.requirements){
      for (var action in this.requirements[req]){
        for (var val in this.requirements[req][action]){
          // console.log('val', this.requirements[req][action][val])
          if (this.requirements[req][action][val] === false) return false;
        }
      }
    }
    return true;
  }

    //check and update requirements
    updateReq(variable, action, val){
        if (_.has(this.requirements, variable, action, val)){
           this.requirements[variable][action][val] = true;
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

              //save it.
              // return UserFactory.save(userInfo);
              // userInfo.update();
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