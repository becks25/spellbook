app.factory('AvatarFactory', function(MapObjectFactory, AuthService, UserFactory, TilesizeFactory){


  class Avatar extends MapObjectFactory {

  	
  	constructor(name, position, action, varName, variables, match){
  		super(name, position, action, varName, variables, match);
      	this.type = 'Avatar';
      	this.name = 'WizardBoy1';
      	this.picture = 'WizardBoy1';
        this.entity.attr({w: TilesizeFactory.TILESIZE + 5, h: TilesizeFactory.TILESIZE +5});
        this.entity.z = 10;
        this.entity.origin('center');
        console.log('avatar', this.entity);
        //this.entity._attr= ({w: TilesizeFactory.TILESIZE + 20, h: TilesizeFactory.TILESIZE +20, rotation: 0});
        //this.entity = this.basicEntity(name);

	
  }

}


  return Avatar;


  
});