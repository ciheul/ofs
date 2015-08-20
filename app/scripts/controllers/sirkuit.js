'use strict';

angular.module('ofsApp')
.controller('SirkuitCtrl', function($http, $scope) {

  /*$http.get('/api/SubstationOverview/SubstationUnit')
      .success(function(data) {
          if (data.name === 'POWER METER') {
            $scope.powerMeter = (50, 250, 50, 300);
          }
      });*/

  $scope.sketch = function(prc) {
    var width;
    var height;
    var padding;
    var X;
    var Y;
    var th; // triangle height
    var r, rTrf; // radius

    var ds = {
      incoming: ["TRF.STV", "CB-I.01", "PM-INC"],
      outgoing: [
        ["CB-O.01", "PM-T150"],
        ["PM-T175", 'TRF.STVIII'],
      ],
      detail: {
        "TRF.STV": { type: 'TRF' },
        "CB-I.01": { type: 'CB', status: 1 },
        "PM-INC": { type: 'PM' },

        "CB-O.01": { type: 'CB', status: 0 },
        "PM-T150": { type: 'PM' },

        "PM-T175": { type: 'PM' },
        "TRF.STVIII": { type: 'TRF' },
      }
    };

    prc.setup = function() { 
      width = 600;
      height = 600;
      padding = 60;
      th = 10;
      r = 15;
      rTrf = 10;

      prc.size(width, height);
      prc.frameRate(60);
      prc.background('grey');

      X = width / 2;
      Y = height / 2;
  	};

    prc.draw = function() { 
      // draw incoming line
      drawIncomingLine(ds);
      // prc.strokeWeight(2);

      if (ds.outgoing.length > 1) {
        // prc.strokeWeight(2);
        prc.line(padding, Y, width - padding, Y);
      }

      drawOutgoingLine(ds);
    };

    function drawIncomingLine(ds) {
      // draw the vcc (electrical term)
      prc.triangle(X, padding + th, X - th, padding, X + th, padding);

      // draw the incoming line
      prc.line(X, padding + th, X, Y);

      // yHeight for each object in incoming line
      var yHeight = padding + th;

      // divide the incoming line into n parts based on incoming data structure
      var yShift = (Y - (padding + th)) / (ds.incoming.length + 1);

      for (var i = 0; i < ds.incoming.length; i++) {
        // get the type of incoming object 
        var type = ds.detail[ds.incoming[i]].type;

        // each iteration calculate y position
        var yHeight = yHeight + yShift;

        // draw object based on type
        if (type === "TRF") {
          drawTRF(X, yHeight, ds.incoming[i]);
        } else if (type === "PM") {
          drawPM(X, yHeight, ds.incoming[i]);
        } else if (type === "CB") {
          drawCB(X, yHeight, ds.detail[ds.incoming[i]].status, ds.incoming[i]);
        }
      }
    }

    function drawOutgoingLine(ds) {
      if (ds.outgoing.length === 1) {
        drawOutgoingObjects(ds, 0, X);
      } else {
        var xPos = padding;
        var xShift = (width - padding*2) / (ds.outgoing.length - 1);
        for (var j = 0; j < ds.outgoing.length; j++) {
          drawOutgoingObjects(ds, j, xPos);
          xPos = xPos + xShift;
        }
      }
    }

    function drawOutgoingObjects(ds, j, x) {
      // draw the outgoing line
      prc.line(x, Y, x, height - padding - th);

      // draw the gnd (electrical term)
      prc.triangle(x, height - padding, x - th, height - padding - th, x + th, height - padding - th);

      // yHeight for each object in incoming line
      var yHeight = Y;

      // divide the incoming line into n parts based on incoming data structure
      // var yShift = (Y - (padding + th)) / (ds.incoming.length + 1);
      var yShift = (height - padding - th - Y) / (ds.outgoing[j].length + 1);

      var out = ds.outgoing[j];
      console.log(out);

      for (var i = 0; i < out.length; i++) {
        // get the type of incoming object 
        var type = ds.detail[out[i]].type;

        // each iteration calculate y position
        var yHeight = yHeight + yShift;

        // draw object based on type
        if (type === "TRF") {
          drawTRF(x, yHeight, out[i]);
        } else if (type === "PM") {
          drawPM(x, yHeight, out[i]);
        } else if (type === "CB") {
          drawCB(x, yHeight, ds.detail[out[i]].status, out[i]);
        }
      }
    }

    function drawTRF(x, y, text) {
      prc.fill(255);
      prc.ellipse(x, y - 5, r, r);
      prc.noFill();
      prc.ellipse(x, y + 5, r, r);
      // prc.loadFont("sans");
      // prc.text(text, 100, 100);
      // prc.fill(255);
      // prc.ellipse(X, 85, r, r);
    }

    function drawPM(x, y, text) {
      prc.fill(255);
      prc.ellipse(x - 3, y, rTrf, rTrf);
      prc.noFill();
      prc.ellipse(x + 3, y, rTrf, rTrf);

      prc.line(x + 9, y, x + 30, y);
      prc.rect(x + 30, y - 10, 20, 20);
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
    }
  };
});
