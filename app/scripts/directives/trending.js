'use strict';

angular.module('ofsApp')
  .directive('trendingChart', ['$document', 'd3Service',
      function($document, d3Service) {
    return {
      restrict: 'E',
      scope: {
        val: '='
      },
      link: function(scope, element, attrs) {
        d3Service.X().then(function(d3) {
          // just to silent warnings in jshint
          attrs = null;

          scope.$watch('val', function(newVal) {
            // if 'val' is undefined, exit
            if (!newVal) { return; }

            function alterDataStructure(res) {
              // function to convert to javascript date object
              var parseDate = d3.time.format('%Y-%m-%d %H%M%S').parse;

              var keys = d3.keys(res);
              var dataset = [];
              for (var i = 0; i < res.VoltageUnbalances.length; i++) {
                var obj = {};
                for (var k = 0; k < keys.length; k++) {
                  var key = keys[k];
                  // if (res[key].length === 0) continue;
                  if (res[key].length === 0) { continue; }
                  if (key === 'FR602_TimeStamplist') {
                    obj[key] = parseDate(res[key][i]);
                  } else {
                    obj[key] = res[key][i];
                  }
                }
                dataset.push(obj);
              }
              return dataset;
            }

            function renderGraph(data) {

              var trendingChart = $document[0].getElementsByTagName('trending-chart')[0];
              while (trendingChart.firstChild) {
                trendingChart.removeChild(trendingChart.firstChild);
              }

              // margin the chart
              var margin = { top: 10, right: 20, bottom: 30, left: 50 };
            
              // width and height of the chart
              var width = 1000 - margin.left - margin.right;
              var height = 500 - margin.top - margin.bottom;
              
              // function to determine the scale of x-axis in time and y-axis in linear
              var x = d3.time.scale().range([0, width]);
              var y = d3.scale.linear().range([height, 0]);
              
              var xAxis = d3.svg.axis().scale(x).orient('bottom');
              var yAxis = d3.svg.axis().scale(y).orient('left');
            
              // function to select color
              var color = d3.scale.category10();
            
              // function to generate a line
              var line = d3.svg.line()
                .interpolate('basis')
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.value); });
            
              // draw a 'main' SVG DOM
              var svg = d3.select(element[0])
                .append('svg')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .style('background-color', 'white');
            
              // when zoom function is called, draw x-axis, y-axis, and line according
              // to zoom level
              var draw = function() {
                svg.select('g.x.axis').call(xAxis);
                svg.select('g.y.axis').call(yAxis);
                svg.selectAll('path.line').attr('d', function(d) {
                  return line(d.values);
                });
              };
            
              // function to zoom. it calls draw() function.
              var zoom = d3.behavior.zoom().scaleExtent([0, 10]).on('zoom', draw);
            
              // populate a list with all keys except FR602_TimeStamplist
              // output: ['CurrentMaxlist', 'CurrentMinlist', ...]
              color.domain(d3.keys(data[0]).filter(function(key) {
                return key !== 'FR602_TimeStamplist' && key !== 'FR601_TimeStamplist';
              }));
            
              // modify dataset to a new data structure that fits for d3.extent
              // notice that timestamp is redundant for other information
              // (ex: CurrentMinlist)
              // [
              //   {
              //     name: CurrentMaxlist,
              //     values: [{ date: timestamp, value: 5.489}, ...]
              //   }, ...
              // ]
              var dataTrends = color.domain().map(function(key) {
                var isShow = false;
                if (key === 'CurrentMaxlist') { isShow = true; }
                return {
                  name: key,
                  show: isShow,
                  values: data.map(function(d) {
                    return { date: d.FR602_TimeStamplist, value: d[key] };
                  }) 
                };
              });
            
              x.domain(d3.extent(data, function(d) { return d.FR602_TimeStamplist; }));
            
              y.domain([ 
                d3.min(dataTrends, function(c) {
                  return d3.min(c.values, function(v) { return v.value; });
                }),
                d3.max(dataTrends, function(c) {
                  return d3.max(c.values, function(v) { return v.value; });
                })
              ]); 
            
              // when scrolling up or down, this lines handle the scaling of x,y-axis
              zoom.x(x);
              // zoom.y(y);
            
              // draw the main container
              var container = svg.append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            
              // draw X-axis
              container.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')');
            
              // draw Y-axis
              container.append('g')
                  .attr('class', 'y axis')
                .append('text')
                  .attr('transform', 'rotate(-90)')
                  .attr('y', 6)
                  .attr('dy', '.71em')
                  .style('text-anchor', 'end')
                  .text('Value');
            
              // put all trend lines to this container
              var trendsContainer = container.append('g')
                .attr('class', 'trends');
            
              // draw the DOM based on the data provided
              var trend = trendsContainer.selectAll('path.line')
                .data(dataTrends.filter(function(d) { return d.show; }),
                  function(d) {
                    return d.name;
                  });
            
              // draw lines by executing data-join with the DOM created above
              // furthermore, add function to draw line and function to select
              // color
              trend.enter().append('path')
                .attr('class', 'line')
                .attr('d', function(d) { return line(d.values); })
                .style('stroke', function(d) { return color(d.name); });
            
              // draw an invisible rectangle around chart. these following lines
              // must be declared after all lines to wrap them 
              // container.append("rect")
              //   .attr("class", "pane")
              //   .attr("width", width)
              //   .attr("height", height)
              //   .call(zoom);
            
              function updateLines() {
                // set 'show' state to show or hide a line
                var key = this.value;
                var isChecked = this.checked;
                dataTrends.forEach(function(t) {
                  if (t.name === key) {
                    t.show = isChecked;
                  }
                });
            
                // DATA-JOIN
                // filtering unchecked checkbox happens here. executing filtering after
                // append() method in ENTER pattern only proceeds if it is a NEW data
                //
                // the second argument is a key function. name is used as a key when
                // data join happens
                var trend2 = trendsContainer.selectAll('path.line')
                  .data(dataTrends.filter(function(d) { return d.show; }), function(d) {
                    return d.name;
                  });
            
                // ENTER
                // if unchecking happens, nothing happens here as no incoming data
                // if checking happens, then draw one lines
                trend2.enter().append('path')
                  .attr('class', 'line')
                  .attr('d', function(d) { return line(d.values); })
                  .style('stroke', function(d) { return color(d.name); });
            
                // EXIT
                // selection side that does not have its match, the unchecked checkbox
                // from data side, will be removed 
                trend2.exit().remove();
              }

              function addLegends(dataTrends) {
                d3.select('body').append('h3').text('Legends');

                // add checkboxes to the body
                dataTrends.forEach(function(t) {
                  var input = $document[0].createElement('input');

                  input.setAttribute('class', 'legend');
                  input.setAttribute('type', 'checkbox');
                  input.setAttribute('value', t.name);
                  input.checked = t.show;

                  input.addEventListener('change', updateLines);

                  var legends = $document[0].getElementById('legends');
                  legends.appendChild(input);
                  legends.appendChild($document[0].createTextNode(' ' + t.name));
                });
              }

              draw();
              addLegends(dataTrends);
            }
            
            renderGraph(alterDataStructure(newVal));
          });
        });
      },
    };
  }]);
