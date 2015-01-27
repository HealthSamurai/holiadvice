(function() {
  var app, peer, step1, step2, step3;

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

  app.controller('AppointmentCtrl', [
    '$scope', function($scope) {
      $scope.showChat = false;
      $scope.startChat = function() {
        return $scope.showChat = true;
      };
      return $scope.stopChat = function() {
        return $scope.showChat = false;
      };
    }
  ]);

  step1 = function() {
    navigator.getUserMedia({
      audio: true,
      video: true
    }, (function(stream) {
      $("#my-video").prop("src", URL.createObjectURL(stream));
      window.localStream = stream;
      step2();
    }), function() {
      $("#step1-error").show();
    });
  };

  step2 = function() {
    $("#step1, #step3").hide();
    $("#step2").show();
  };

  step3 = function(call) {
    if (window.existingCall) {
      window.existingCall.close();
    }
    call.on("stream", function(stream) {
      $("#their-video").prop("src", URL.createObjectURL(stream));
    });
    window.existingCall = call;
    $("#their-id").text(call.peer);
    call.on("close", step2);
    $("#step1, #step2").hide();
    $("#step3").show();
  };

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  peer = new Peer({
    key: "ycxtfb4zwy6qolxr",
    debug: 3,
    config: {
      iceServers: [
        {
          url: "stun:stun.l.google.com:19302"
        }
      ]
    }
  });

  peer.on("open", function() {
    $("#my-id").text(peer.id);
  });

  peer.on("call", function(call) {
    call.answer(window.localStream);
    step3(call);
  });

  peer.on("error", function(err) {
    alert(err.message);
    step2();
  });

  $(function() {
    $("#make-call").click(function() {
      var call;
      call = peer.call($("#callto-id").val(), window.localStream);
      step3(call);
    });
    $("#end-call").click(function() {
      window.existingCall.close();
      step2();
    });
    $("#step1-retry").click(function() {
      $("#step1-error").hide();
      step1();
    });
    step1();
  });

}).call(this);
