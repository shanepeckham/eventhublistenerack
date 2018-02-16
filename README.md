# EventHub Listener - The Azure Kubernetes Challenge

A containerised nodejs event listener that listens to Azure Event Hub and passes requests on to an internal endpoint

The following environment variables need to be passed to the container:

### ACK Logging
ENV TEAMNAME=[YourTeamName]

### Event Hub
```
ENV EVENTHUBCONNSTRING= "Endpoint=sb://[youreventhub].servicebus.windows.net/;SharedAccessKeyName=[keyname];SharedAccessKey=[key]"
ENV EVENTHUBPATH=[eventhubname]
ENV EVENTPOLICYNAME="[policy key name]"
ENV EVENTPOLICYKEY="[policy key]"
ENV PARTITIONKEY=[0,1,2]
### For Process Endpoint
ENV PROCESSENDPOINT=http://fulfillorder.[namespace].svc.cluster.local:8080/v1/order/
```

