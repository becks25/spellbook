app.factory('ConditionFnFactory', function(){
	return {
		holding: (thingHeld, spell)=>{
			return spell.holding.indexOf(thingHeld);
		}

        // intersectingPages: (array1, array2) => {
        //     var output = {};
        //     for (var i = 0; i < array1.length; i++) {
        //         for (var j = 0; j < array2.length; j++) {
        //             if (array1[i]._id === array2[j]._id)
        //                 output = array1[i];
        //         }
        //     }
        //     return output;
        // }
    };
});
