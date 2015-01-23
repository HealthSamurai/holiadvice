(function() {
  var app;

  app = angular.module('holiadvice', ['formstamp']);

  app.controller('LandingCtrl', [
    '$scope', function($scope) {
      $scope.wizardStep = 0;
      $scope.wizardGoto = function(i) {
        return $scope.wizardStep = i;
      };
      $scope.startWizard = function() {
        return $scope.wizardStep = 1;
      };
      $scope.closeWizard = function() {
        return $scope.wizardStep = 0;
      };
      $scope.professions = ['IT Consultant', 'Medical Doctor', 'Grass Cutter'];
      return $scope.famstatuses = ['Single', 'Divorced', 'Married'];
    }
  ]);

}).call(this);
