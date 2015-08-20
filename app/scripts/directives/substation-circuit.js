'use strict';

angular.module('ofsApp')
  .directive('circuit', function($document, processingService) {
    return {
      restrict: 'E',
      scope: true,
      link: function(scope, element, attr) {
        processingService.X().then(function(Processing) {
          attr = null;

          function sketch(prc) {
            var width;
            var height;
            var hPadding, vPadding;
            var X;
            var Y;
            var th; // triangle height
            var r, rTrf; // radius
          
            var ds = {
              incoming: ['TRF.STV', 'CB-I.01', 'PM-INC'],
              outgoing: [
                ['CB-O.01', 'PM-T150'],
                ['CB-O.02', 'PM-T175'],
                ['CB-O.03', 'PM-T200'],
                ['CB-O.04', 'PM-T250'],
              ],
              detail: {
                'TRF.STV': { type: 'TRF' },
                'CB-I.01': { type: 'CB', status: 1 },
                'PM-INC': { type: 'PM' },
          
                'CB-O.01': { type: 'CB', status: 0 },
                'PM-T150': { type: 'PM' },
          
                'CB-O.02': { type: 'CB', status: 1 },
                'PM-T175': { type: 'PM' },

                'CB-O.03': { type: 'CB', status: 1 },
                'PM-T200': { type: 'PM' },

                'CB-O.04': { type: 'CB', status: 0 },
                'PM-T250': { type: 'PM' },
              }
            };
          
            prc.setup = function() { 
              width = 800;
              height = 550;

              hPadding = 100;
              vPadding = 20;

              th = 10;
              r = 15;
              rTrf = 10;
          
              X = width / 2;
              Y = height / 2;
          
              prc.size(width, height);
              prc.background('#ffffff');
              prc.noLoop();
          	};
          
            prc.draw = function() { 
              drawIncomingLine(ds);
              drawOutgoingLine(ds);
            };
          
            function drawIncomingLine(ds) {
              // draw the vcc (electrical term)
              prc.triangle(X, vPadding + th,
                           X - th, vPadding,
                           X + th, vPadding);
          
              // draw the incoming line
              prc.line(X, vPadding + th, X, Y);
          
              // yHeight for each object in incoming line
              var yHeight = vPadding + th;
          
              // divide the incoming line into n parts based on incoming data
              // structure
              var yShift = (Y - (vPadding + th)) / (ds.incoming.length + 1);
          
              for (var i = 0; i < ds.incoming.length; i++) {
                // get the type of incoming object 
                var type = ds.detail[ds.incoming[i]].type;
          
                // each iteration calculate y position
                yHeight = yHeight + yShift;
          
                // draw object based on type
                if (type === 'TRF') {
                  drawTRF(X, yHeight, ds.incoming[i]);
                } else if (type === 'PM') {
                  drawPM(X, yHeight, ds.incoming[i]);
                } else if (type === 'CB') {
                  drawCB(X, yHeight, ds.detail[ds.incoming[i]].status,
                         ds.incoming[i]);
                }
              }
            }
          
            function drawOutgoingLine(ds) {
              if (ds.outgoing.length === 1) {
                drawOutgoingObjects(ds, 0, X);
              } else {
                prc.line(hPadding, Y, width - hPadding, Y);
          
                var xPos = hPadding;
                var xShift = (width - hPadding*2) / (ds.outgoing.length - 1);
                for (var j = 0; j < ds.outgoing.length; j++) {
                  drawOutgoingObjects(ds, j, xPos);
                  xPos = xPos + xShift;
                }
              }
            }
          
            function drawOutgoingObjects(ds, j, x) {
              // draw the outgoing line
              prc.line(x, Y, x, height - vPadding - th);
          
              // draw the gnd (electrical term)
              prc.fill(255);
              prc.triangle(x, height - vPadding,
                           x - th, height - vPadding - th,
                           x + th, height - vPadding - th);
          
              // yHeight for each object in incoming line
              var yHeight = Y;
          
              // divide the incoming line into n parts based on incoming data
              // structure
              var yShift =
                (height - vPadding - th - Y) / (ds.outgoing[j].length + 1);
          
              var out = ds.outgoing[j];
          
              for (var i = 0; i < out.length; i++) {
                // get the type of incoming object 
                var type = ds.detail[out[i]].type;
          
                // each iteration calculate y position
                yHeight = yHeight + yShift;
          
                // draw object based on type
                if (type === 'TRF') {
                  drawTRF(x, yHeight, out[i]);
                } else if (type === 'PM') {
                  drawPM(x, yHeight, out[i]);
                } else if (type === 'CB') {
                  drawCB(x, yHeight, ds.detail[out[i]].status, out[i]);
                }
              }
            }
          
            function drawTRF(x, y, text) {
              prc.fill(255);
              prc.ellipse(x, y - 5, r, r);
              prc.noFill();
              prc.ellipse(x, y + 5, r, r);

              prc.fill(0);
              prc.text(text, x + 15, y + 5);
            }
          
            function drawPM(x, y, text) {
              prc.fill(255);
              prc.ellipse(x - 3, y, rTrf, rTrf);
              prc.noFill();
              prc.ellipse(x + 3, y, rTrf, rTrf);
          
              prc.line(x + 9, y, x + 30, y);
              prc.rect(x + 30, y - 12, 25, 25);

              prc.fill(0);
              prc.text('PM', x + 34, y + 5);
              prc.text(text, x + 34, y + 30);
            }
          
            function drawCB(x, y, status, text) {
              prc.strokeWeight(3);
              prc.line(x, y - 10, x, y - 20);
          
              if (status === 0) {
                prc.stroke(255);
              }
          
              prc.line(x, y - 6, x, y + 6);
          
              prc.stroke(0);
              prc.line(x, y + 10, x, y + 20);
              prc.strokeWeight(1);

              prc.fill(0);
              prc.text(text, x + 15, y + 5);
            }
          }

          var canvas = $document[0].createElement('canvas');
          element[0].appendChild(canvas);

          new Processing(canvas, sketch);
        });
      }
    };
  });
