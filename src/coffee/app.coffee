app = angular.module('holiadvice', [])
app.controller('LandingCtrl', ['$scope', ($scope) ->
  $scope.wizardActivated = true

  $scope.startWizard = () ->
    $scope.wizardActivated = true
])
