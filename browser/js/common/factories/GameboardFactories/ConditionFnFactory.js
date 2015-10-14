app.factory('ConditionFnFactory', function(){
	return {
        //checks if the avitar has picked up a certain item
		holding: (thingHeld, spell)=>{
			return spell.holding.indexOf(thingHeld);
		},
        //checks to see if any item on a square has a .match property that matches the arg
        match: (thingToMatch, spell) => {
            var pos = spell.avatar.position;
            return spell.map.checkPos(pos, thingToMatch, 'match');
        },

    };
});
