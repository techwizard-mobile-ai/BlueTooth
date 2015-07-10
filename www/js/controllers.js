angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope) {})

  .controller('BLECtrl', function($scope, BLE) {

    // keep a reference since devices will be added
    $scope.devices = BLE.devices;

    var success = function () {
      if ($scope.devices.length < 1) {
        // a better solution would be to update a status message rather than an alert
        alert("Didn't find any Bluetooth Low Energy devices.");
      }
    };

    var failure = function (error) {
      alert(error);
    };

    // pull to refresh
    $scope.onRefresh = function() {
      BLE.scan().then(
        success, failure
      ).finally(
        function() {
          $scope.$broadcast('scroll.refreshComplete');
        }
      )
    }

    // initial scan
    BLE.scan().then(success, failure);

  })

  .controller('BLEDetailCtrl', function($scope, $stateParams, BLE) {
    BLE.connect($stateParams.deviceId).then(
      function(peripheral) {
        $scope.device = peripheral;
      }
    );
  });