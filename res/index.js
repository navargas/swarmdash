var exapmle = {
  "bluemix": {
    "vblock01":["container01", "ubuntu", "nginx"],
    "vm2":["another", "nginx"] },
  "amazon": {
    "vblock01":["container01", "ubuntu", "nginx"],
    "ec2-01":["centos"] },
  "softlayer": {
    "vm1":[],
    "vm2":["nginx", "apache", "db2"] },
   "digital ocean": {
     "vm1":[],
     "vm2":["nginx"]}
};

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

  $('.clientid').hide();
  $('#dashbox').css('display', 'block');

  function loadJSON(object) {
    for (var provider in object) {
      if (!object.hasOwnProperty(provider)) continue;
      var title = $('<h3>')
        .text(provider);
      var item = $('<div>')
        .addClass('col-md-12')
        .addClass('parentContainer')
        .append(title);
      var box = $('<span>')
        .addClass('col-md-4 col-sm-6')
        .append(item);
      var innerItems = object[provider];
      for (var machine in innerItems) {
        var innerChild = $('<div>')
          .addClass('col-md-12')
          .addClass('innerContainer');
        innerChild.text(machine);
        item.append(innerChild);
      }
      $('#dashbox').append(box);
    }
  }; loadJSON(exapmle);
});
