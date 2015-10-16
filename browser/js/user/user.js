app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/me',
        data: {
          authenticate: true
        },
        views: {
            'main': {
                controller: 'UserCtrl',
                templateUrl: 'js/user/user.html'
            }
        },
        resolve: {
          user: (UserFactory, AuthService) => {
            return AuthService.getLoggedInUser()
            .then(user => {
                return UserFactory.find(user._id);

            })
          }
          // completedStories: (user, StoryFactory)
        }
    });
});

app.controller('UserCtrl', function ($scope, AuthService, UserFactory, $state, user, StoryFactory, LARGE_AVATARS, $window) {
  $scope.user = user;
  $scope.allAvatars = LARGE_AVATARS;

  $scope.totalPoints = (function(){
    var total = 0;

    $scope.user.mastery.forEach(concept => total+= concept.pointsEarned);

    return total;
  })();

  var findIfStarted = (story) => {
        return story.getAllPages(story._id)
            .then(pages => {
                for(var i =0; i < user.unfinishedPages.length; i++) {
                    if(user.unfinishedPages[i].storyId === story._id) {
                        console.log('here');
                        return user.unfinishedPages[i];
                    }
                }
                for(var j =0; j < pages.length; j++) {
                    if(pages[j].pageNumber === 0) return pages[j];
                }
            });
    };
    
  $scope.goToStoryPage = (event, story) => {
        findIfStarted(story).then(result => {
          $state.go('page', {id: result._id})
        });
    };

  $scope._ = _;

  $scope.ranger = _.range(3,19);
  $scope.userCopy = _.create($scope.user);

  $scope.editing=false;

  $scope.toggleEditing = function(){
    $scope.editing = !$scope.editing;
  };

  $scope.selectCharacter = (character) => {
    $scope.user.character.picture = character;
  };

  $scope.restoreValuesToSaved = () => {
    $scope.user = _.create($scope.userCopy);
  };


  $scope.saveProfile = () =>{
    console.log('saving');
    UserFactory.update($scope.user._id, $scope.user);
  };


  var dataArr = [];

  function Dataset(concept, points, possible) {
    this.label= concept;
    this.points= points;
    this.possible= possible-points;
    if(possible===0) this.possible = 1;
    this.data= [this.points, this.possible];
  };

  $scope.user.mastery.forEach(concept =>{
    var data = new Dataset(concept.topic, concept.pointsEarned, concept.pointsPossible);

    dataArr.push(data);
  });

  console.log(dataArr);

  

  var width = document.querySelector('#mastery').clientWidth/3 *2;

  var radius = Math.min(width, width) / 2;

  var color = d3.scale.category20c();

  var pie = d3.layout.pie()
      .sort(null);

  var arc = d3.svg.arc()
      .innerRadius(radius - radius/2)
      .outerRadius(radius - radius/4);

    dataArr.forEach((data, index) => {
        var svg = d3.select("#mastery").append("svg")
            .attr("width", width)
            .attr("height", width)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

        var path = svg.selectAll("path")
            .data(pie(data.data))
          .enter().append("path")
            .attr("fill", function(d, i) { return color((index*4) + i); })
            .attr("d", arc)
            .transition() //animate the pies!
            .ease("circle")
            .duration(1200)
            .attrTween("d", tweenPie);


        svg.append("text")
           .attr('dy', '-.3em')
           .attr("text-anchor", "middle")
           .text(function(d, i){
              return data.label;
            })

        svg.append("text")
           .attr('dy', '1em')
           .attr("text-anchor", "middle")
           .text(function(d, i){
              var total = 0;
              if(data.points !== 0) total = data.points+data.possible;

              return data.points + '/' + total + ' points';
            })
      });





  function tweenPie(b) {
    var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
    return function(t) { return arc(i(t)); };
  }
});
