// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';
var EventHubClient = require('azure-event-hubs').Client;
var Promise = require('bluebird');
var util = require("util");


// The Event Hubs SDK can also be used with an Azure IoT Hub connection string.
// In that case, the eventHubPath variable is not used and can be left undefined.
var connectionString = 'Endpoint=sb://coffee.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=2dXz/klqlCd2YLEaUp1D91p2q1bgaW9F/ZJSt39yT3I=';
var eventHubPath = 'orders';
var body = "";

var sendEvent = function (eventBody) {
  return function (sender) {
    console.log('Sending Event: ' + eventBody);
    return sender.send(eventBody);
  };
};

var printError = function (err) {
  console.error(err.message);
};

var printEvent = function (ehEvent) {
  console.log('Event Received: ');
  console.log(JSON.stringify(ehEvent.body));
  var jj = JSON.stringify(ehEvent.body);
  let bufferOriginal = Buffer.from(JSON.parse(jj).data);
  console.log(bufferOriginal.toString('utf8'));
  var json = bufferOriginal.toString('utf8');
};

var client = EventHubClient.fromConnectionString(connectionString, eventHubPath);
var receiveAfterTime = Date.now() - 5000;

client.open()
      .then(client.getPartitionIds.bind(client))
      .then(function (partitionIds) {
        console.log(partitionIds);
        var p = ["0"] ;
        return Promise.map(partitionIds, function (partitionId) {
          return client.createReceiver('$Default', partitionId, { 'startAfterTime' : receiveAfterTime}).then(function(receiver) {
            receiver.on('errorReceived', printError);
            receiver.on('message', printEvent);
          });
        });
      })
      .then(function() {
        return client.createSender();
      })
     // .then(sendEvent('foo'))
      .catch(printError);