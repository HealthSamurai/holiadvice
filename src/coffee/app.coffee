app = angular.module('holiadvice', ['formstamp'])
app.controller('LandingCtrl', ['$scope', ($scope) ->
  $scope.wizardStep = 0

  $scope.wizardGoto = (i) ->
    $scope.wizardStep = i

  $scope.startWizard = () ->
    $scope.wizardStep = 1

  $scope.closeWizard = () ->
    $scope.wizardStep = 0

  $scope.professions = ['IT Consultant', 'Medical Doctor', 'Grass Cutter']
  $scope.famstatuses = ['Single', 'Divorced', 'Married']
])

app.controller('AppointmentCtrl', ['$scope', ($scope) ->
  $scope.showChat = true;
])
