step1 = ->

  # Get audio/video stream
  navigator.getUserMedia
    audio: true
    video: true
  , ((stream) ->

    # Set your video displays
    $("#my-video").prop "src", URL.createObjectURL(stream)
    window.localStream = stream
    step2()
    return
  ), ->
    $("#step1-error").show()
    return

  return
step2 = ->
  $("#step1, #step3").hide()
  $("#step2").show()
  return
step3 = (call) ->

  # Hang up on an existing call if present
  window.existingCall.close()  if window.existingCall

  # Wait for stream on the call, then set peer video display
  call.on "stream", (stream) ->
    $("#their-video").prop "src", URL.createObjectURL(stream)
    return


  # UI stuff
  window.existingCall = call
  $("#their-id").text call.peer
  call.on "close", step2
  $("#step1, #step2").hide()
  $("#step3").show()
  return

navigator.getUserMedia = navigator.getUserMedia or navigator.webkitGetUserMedia or navigator.mozGetUserMedia
peer = new Peer(
  key: "ycxtfb4zwy6qolxr"
  debug: 3
  config:
    iceServers: [url: "stun:stun.l.google.com:19302"]
)

peer.on "open", ->
  $("#my-id").text peer.id
  return

peer.on "call", (call) ->
  call.answer window.localStream
  step3 call
  return

peer.on "error", (err) ->
  alert err.message
  step2()
  return

$ ->
  $("#make-call").click ->
    call = peer.call($("#callto-id").val(), window.localStream)
    step3 call
    return

  $("#end-call").click ->
    window.existingCall.close()
    step2()
    return

  $("#step1-retry").click ->
    $("#step1-error").hide()
    step1()
    return

  step1()
  return

