app.factory('LevelFactory', function(PageFactory){
  class Level {
    constructor(page){
      this.map = page.gameboard;
      this.win = page.requirements;
      this.hint = page.hint;
      this.concepts = page.concepts;

      //the background for the challenge, not the story
      this.background = page.image;
    }


  }

  return Level;


});