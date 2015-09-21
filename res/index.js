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
  var hasFirstEvent = false;

  function subscribe(id, client) {
    client.subscribe(
      'iot-2/type/quickstart/id/' + id + '/evt/event/fmt/json'
    );
  };

  var appClientConfig = {
    org: 'quickstart',
    type: 'quickstart',
    id: 'virtualdevice-104248025367916554634-default'
  };
  var iotClient = new IBMIoTF.ApplicationClient(appClientConfig);
  
  // User submits client ID
  clientIdButton.click(function(e) {
    var spinner = new Spinner({position:'relative'}).spin(document.getElementById('clientIdButton'));
    clientIdButton.css('color', 'rgba(255,255,255,0)');
    clientIdButton.css('background-color', 'rgba(255,255,255,0)');
    clientIdButton.css('border-color', 'rgba(255,255,255,0)');
    clientIdButton.blur();
    var readyTest = setInterval(function() {
      console.log('Waiting for data...');
      if (!hasFirstEvent) return;
      clearInterval(readyTest);
      $('.clientid').hide();
      $('#dashbox').css('display', 'block');
    }, 1000);
    subscribe(clientIdInput.val(), iotClient);
    location.hash = clientIdInput.val();
  });


  function switchToDash() {
    if (!hasFirstEvent) return;
    clearInterval(this);
    $('.clientid').hide();
    $('#dashbox').css('display', 'block');
  };

  function newColor(seed) {
    selection = ['A', 'F', 'B', 'E', 'C', 'D'];
    Math.seedrandom(seed);
    var R = selection[Math.floor(Math.random() * selection.length)];
    var G = selection[Math.floor(Math.random() * selection.length)];
    var B = selection[Math.floor(Math.random() * selection.length)];
    return '#' + R + G + B;
  };

  function loadJSON(cluster) {
    $('#dashbox').empty();
    for (var provider in cluster) {
      if (!cluster.hasOwnProperty(provider)) continue;
      var title = $('<h3>')
        .text(provider);
      var item = $('<div>')
        .addClass('col-md-12')
        .css('background-color', newColor(provider))
        .addClass('parentContainer')
        .append(title);
      var box = $('<span>')
        .addClass('col-md-4 col-sm-6')
        .append(item);
      for (var machine in cluster[provider]) {
        var list = $('<ul>');
        var innerChild = $('<div>')
          .addClass('col-md-12')
          .addClass('innerContainer')
          .text(machine)
          .append(list);
        for (var container in cluster[provider][machine]) {
          var innermostItem = $('<li>')
            .text(cluster[provider][machine][container]);
          list.append(innermostItem);
        }
        item.append(innerChild);
      }
      $('#dashbox').append(box);
    }
  };

  iotClient.on('connect',function(e) {
    if (location.hash) {
      clientIdInput.val(location.hash.slice(1));
      clientIdButton.trigger('click');
    };
  });
  iotClient.on('deviceEvent',function(e) {
    hasFirstEvent = true;
    loadJSON(JSON.parse(e.payload.toString()));
  });
  iotClient.on('error',function(e) {console.log(e)});
  iotClient.connect();

});
