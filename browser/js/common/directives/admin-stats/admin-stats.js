app.directive('adminStats', function(UserFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/admin-stats/admin-stats.html',
    link: (scope, elem) => {

        //Make age distribution chart
        var ages = Array(20).join(0).split('');

        var temp = _.assign(ages, scope.ageDist);

        var objData = _.omit(temp, [0, 1, 2, 'undefined']);

        var w = document.querySelector('#ageChart').clientWidth;

        var h = 150;

        var xScale = d3.scale.ordinal()
                        .domain(_.range(3,19))
                        .rangeRoundBands([0, w-20], 0.05); 

        var yScale = d3.scale.linear()
                        .domain([0, d3.max(Object.keys(objData), function(d) {
                            return objData[d];
                        })])
                        .range([0, h-60]);

        var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .tickValues(_.range(3,19))
                      .ticks(15);

        var key = function(d) {
            return d;
        };

        //Create SVG element
        var svg = d3.select("#ageChart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .append("g")
                    .attr("transform", "translate(20, -20)");

        //add the x axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "0.3em")
            .attr("dy", "0.5em")

        //Create bars
        svg.selectAll("rect")
           .data(Object.keys(objData), key)
           .enter()
           .append("rect")
           .attr("x", function(d, i) {
                return xScale(d);
           })
           .attr("y", function(d) {
                return h - yScale(objData[d]);
           })
           .attr("width", xScale.rangeBand())
           .attr("height", function(d) {
                return yScale(objData[d]);
           })
           .attr("fill", function(d) {
                return "rgb(0, 0, " + (d * 10) + ")";
           })

        //Create labels
        Object.keys(objData).forEach(age => {
          svg.append("text")
             .data(age)
             .text(function(d) {
                  return objData[age];
             })
             .attr("text-anchor", "middle")
             .attr("x", function(d, i) {
                  return xScale(age) + xScale.rangeBand() / 2;
             })
             .attr("y", function(d) {
                  return h -10;
             })
             .attr('fill', 'white');
        });

        //insert pie chart!
        var genders = {
          'male': 0, 
          'female': 0,
          'other': 0,
          'prefer not to say':0
        };

        var genderData = _.assign(genders, scope.genderDist);

        genderData['prefer not to say'] += genderData.undefined;

        var genderData = _.omit(genderData, ['undefined']);
        var genderData =_.pairs(genderData);

        var width = document.querySelector('#genderChart').clientWidth -30;
        var r = width/2;
        var color = d3.scale.category20c();

        var data = [{"label":"Category A", "value":20}, 
                      {"label":"Category B", "value":50}, 
                      {"label":"Category C", "value":30}];


        var vis = d3.select('#genderChart')
                    .append("svg")
                    .data([genderData])
                    .attr("width", width)
                    .attr("height", width)
                    .append("svg:g")
                    .attr("transform", "translate(" + r + "," + r + ")");

        var pie = d3.layout.pie()
                    .value(function(d){
                      return d[1]; 
                    });

        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r-15);

        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
                      .data(pie)
                      .enter()
                      .append("svg:g")
                      .attr("class", "slice");
        arcs.append("svg:path")
            .attr("fill", function(d, i){
                return color(i);
            })
            .attr("d", function (d) {
                return arc(d);
            });

        // add the text
        arcs.append("svg:text")
              .attr("transform", function(d){
                  d.innerRadius = 0;
                  d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")"; 
              }).attr("text-anchor", "middle")
              .text( function(d, i) {
                  if(genderData[i][1] > 0)
                  return genderData[i][0]; 
                }
              );
  
    }
  };
});