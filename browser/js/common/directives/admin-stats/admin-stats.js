app.directive('adminStats', function(UserFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/admin-stats/admin-stats.html',
    link: (scope, elem) => {
        var w = document.querySelector('#ageChart').clientWidth;

        var genders = ['male', 'female', 'other', 'prefer not to say'];

        console.log(scope.genderDist);


        //Make age distribution chart
        var ages = Array(18).join(0).split('');

        var objData = _.assign(ages, scope.ageDist);

        var w = document.querySelector('#ageChart').clientWidth;

        var h = 100;

        var xScale = d3.scale.ordinal()
                        .domain(d3.range(Object.keys(objData).length))
                        .rangeRoundBands([0, w], 0.05); 

        var yScale = d3.scale.linear()
                        .domain([0, d3.max(Object.keys(objData), function(d) {
                            return objData[d];
                        })])
                        .range([0, h-30]);

        var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(20);

        var key = function(d) {
            return d;
        };

        //Create SVG element
        var svg = d3.select("#ageChart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .append("g")
                    .attr("transform", "translate(0, -20)");


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "0.3em")
            .attr("dy", "0.5em");


        //Create bars
        svg.selectAll("rect")
           .data(Object.keys(objData), key)
           .enter()
           .append("rect")
           .attr("x", function(d, i) {
                return xScale(i);
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

            //Tooltip
            .on("mouseover", function(d) {
                //Get this bar's x/y values, then augment for the tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
                var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
                
                //Update Tooltip Position & value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d);
                d3.select("#tooltip").classed("hidden", false)
            })
            .on("mouseout", function() {
                //Remove the tooltip
                d3.select("#tooltip").classed("hidden", true);
            });

        //Create labels
        svg.selectAll("text")
           .data(Object.keys(objData), key)
           .enter()
           .append("text")
           .text(function(d) {
                return d;
           })
           .attr("text-anchor", "middle")
           .attr("x", function(d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
           })
           .attr("y", function(d) {
                return h -10;
           })
           .attr("font-family", "sans-serif") 
           .attr("font-size", "11px")
           .attr("fill", "white");
           
        var sortOrder = false;
        var sortBars = function () {
            sortOrder = !sortOrder;
            
            sortItems = function (a, b) {
                if (sortOrder) {
                    return a - b;
                }
                return b - a;
            };

            svg.selectAll("rect")
                .sort(sortItems)
                .transition()
                .delay(function (d, i) {
                return i * 50;
            })
                .duration(1000)
                .attr("x", function (d, i) {
                return xScale(i);
            });

            svg.selectAll('text')
                .sort(sortItems)
                .transition()
                .delay(function (d, i) {
                return i * 50;
            })
                .duration(1000)
                .text(function (d) {
                return d;
            })
                .attr("text-anchor", "middle")
                .attr("x", function (d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
            })
                .attr("y", function (d) {
                return h - yScale(d) + 14;
            });
        };

  
    }
  };
});