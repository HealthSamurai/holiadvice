app = angular.module('holiadvice', ['formstamp'])
app.controller('LandingCtrl', ['$scope', ($scope) ->
  $scope.wizardActivated = true

  $scope.startWizard = () ->
    $scope.wizardActivated = true

  $scope.professions = ['IT Consultant', 'Medical Doctor', 'Grass Cutter']
  $scope.famstatuses = ['Single', 'Divorced', 'Married']
])
