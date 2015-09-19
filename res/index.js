$(function () {
  var clientIdInput  = $('#clientIdInput');
  var clientIdButton = $('#clientIdButton');
  
  // User submits client ID
  clientIdButton.click(function(e) {
    var spinner = new Spinner({position:'relative'}).spin(document.getElementById('clientIdButton'));
    clientIdButton.css('color', 'rgba(255,255,255,0)');
    clientIdButton.css('background-color', 'rgba(255,255,255,0)');
    clientIdButton.css('border-color', 'rgba(255,255,255,0)');
    clientIdButton.blur();
  });
});
