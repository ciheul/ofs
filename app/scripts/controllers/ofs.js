var ofsControllers = angular.module('ofsControllers', []);

ofsControllers.controller('ofsListCtrl', function ($scope) {
  console.log("debug");

  $scope.result= {total : 0, green : 0, black : 0, yellow : 0, red : 0, gray : 0};
  $scope.count = function(totalWells) {
    console.log("debug 1");
    for (var i = 0; i < totalWells.length; i++) {
      for(var j = 0; j < totalWells[i].wells.length; j++) {
        if (totalWells[i].wells[j].status === 'black') {
          $scope.result.black += 1;
        };
        if (totalWells[i].wells[j].status === 'yellow') {
          $scope.result.yellow += 1;
        };
         if (totalWells[i].wells[j].status === 'gray') {
          $scope.result.gray += 1;
        };
         if (totalWells[i].wells[j].status === 'green') {
          $scope.result.green += 1;
        };
        if (totalWells[i].wells[j].status === 'red') {
          $scope.result.red += 1;
        };
        $scope.result.total = ($scope.result.black + 
            $scope.result.yellow +
            $scope.result.green +
            $scope.result.gray 
            );
    }
    
  };
 /* console.log($scope.result);
*/
  console.log($scope.result);
  console.log("debug 2");
  }


$scope.totalWells = [
{
    'name': 'ST. P. PLANT 1',
    'bopd': 10,
    'brl': 1100,
    wells: [
    {
        'name': 'T.17R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.27R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'gray', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.37R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.47R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.57R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'black', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.67R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.77R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.87R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'yellow', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            }

            ] 
        },
        {
            'name': 'ST. P. PLANT 2',
            'bopd': 10,
            'brl': 1100,
            wells: [
            {
                'name': 'T.17R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.27R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'gray', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.37R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.47R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.57R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'black', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.67R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.77R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.87R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'yellow', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            }

            ] 
        },
        {
            'name': 'ST. P. PLANT 3',
            'bopd': 10,
            'brl': 1100,
            wells: [
            {
                'name': 'T.17R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.27R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'gray', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.37R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.47R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.57R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'black', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.67R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.77R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.87R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'yellow', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            }

            ] 
        },
        {
            'name': 'ST. P. PLANT 4',
            'bopd': 10,
            'brl': 1100,
            wells: [
            {
                'name': 'T.17R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.27R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'gray', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.37R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.47R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.57R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'black', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.67R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.77R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.87R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'yellow', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            }

            ] 
        },
        {
            'name': 'ST. P. PLANT 5',
            'bopd': 10,
            'brl': 1100,
            wells: [
            {
                'name': 'T.17R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.27R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'gray', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.37R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.47R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.57R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'black', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.67R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.77R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.87R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'yellow', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            }

            ] 
        },
        {
            'name': 'ST. P. PLANT 6',
            'bopd': 10,
            'brl': 1100,
            wells: [
            {
                'name': 'T.17R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.27R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'gray', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.37R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.47R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.57R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'black', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.67R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.77R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.87R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'yellow', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            }

            ] 
        },
        {
            'name': 'ST. P. PLANT 7',
            'bopd': 10,
            'brl': 1100,
            wells: [
            {
                'name': 'T.17R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.27R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'gray', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.37R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.47R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.57R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'black', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.67R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.77R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.87R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'yellow', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            }

            ] 
        },
        {
            'name': 'ST. P. PLANT 8',
            'bopd': 10,
            'brl': 1100,
            wells: [
            {
                'name': 'T.17R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.27R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'gray', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.37R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.47R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.57R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'black', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.67R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 15, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.77R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 7.5, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'green', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            },
            {
                'name': 'T.87R',
                'status_name': 0, // 0: 'green', 1: 'red'
                'size': 30, // 1: 'small', 2: 'medium', 3: 'large'
                'status': 'yellow', // 0: 'green', 1: 'red', 2: 'yellow', 3: 'black'
            }

            ] 
        }

        ];
/*var totalWells = $scope.totalWells;
var wells = $scope.totalWells.wells;*/

  $scope.count($scope.totalWells);
});


ofsControllers.controller('electricalCtrl', function ($scope){
    $scope.totalElectrical = [
    {   
        'name': 'ST. P. PLANT 1',
        'incoming':'I.87R',
        'trafo':'T.87R'
    },
    ];
});

