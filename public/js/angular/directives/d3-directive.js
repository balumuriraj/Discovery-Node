/*
 * D3.js directive
 */

angular.module("ngd3", [])
    .directive('donut', ['$timeout', function(timer) {
    
    // constants
    var data = [10, 50, 80];
    
    var $container = $('.donut-container'),
        angle = 2 * Math.PI;
    
    var width = $container.width(),
    height = width,
    outerRadius = Math.min(width,height)/2,
    innerRadius = (outerRadius/3)*2,
    fontSize = (Math.min(width,height)/4);
    
    console.log(width + " " + height + " " +  outerRadius + " " + innerRadius);

    return{
        restrict: 'E', // the directive can be invoked only by using <donut> tag in the template
        scope: {
            val: '='  
        },
        link: function(scope, element, attrs) {
            
            
            
            var svgfun = function(){
                
                console.log("**************************************************"+scope.val.value);
                
                
                // set up initial svg object
                var svg = d3.select(element[0])
                    .append("svg")
                        .attr("width", "100%")
                        .attr("height", height + "px")
                        .attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
                        .attr('preserveAspectRatio','xMinYMin')
                        .append("g")
                        .attr("transform", "translate(" + width / 2 + "," + Math.min(width,height) / 2 + ")");

                var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius)
                    .startAngle(0);

                var text = svg.append("text")
                    .text(scope.val.value)
                    .attr("text-anchor", "middle")
                    .style("font-size", fontSize+'px')
                    .attr("dy",fontSize/3)
                    .attr("dx",2);

                var background = svg.append("path")
                    .datum({endAngle: angle})
                    .style("fill", "#eee")
                    .attr("d", arc);

                var foreground = svg.append("path")
                    .datum({endAngle: 0 * angle})
                    .style("fill", "#f06060")
                    .attr("d", arc);

                setTimeout(function() {
                  foreground.transition()
                      .duration(750)
                      .call(arcTween, ((scope.val.percent * angle) / 100));
                }, 500);

                function arcTween(transition, newAngle) {

                    transition.attrTween("d", function(d) {

                        var interpolate = d3.interpolate(d.endAngle, newAngle);

                        return function(t) {

                            d.endAngle = interpolate(t);
                            return arc(d);
                        };
                    });
                }   
            }
            
            timer(svgfun, 500);
            
            scope.$watch('exp', function (newVal, oldVal) {
                
            });
            
        }
    };
    
}]);