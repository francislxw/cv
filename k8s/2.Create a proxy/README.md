# Kube Proxy 

Proxy runs on each node, proxies UDP, TCP and SCTP, does not understand HTTP, provides load balancing, is only used to reach services

1. $ kubectl proxy
```
Starting to serve on 127.0.0.1:8001
```

2. $ curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/

```
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-4tfqn | v=1
```

3. $ kubectl exec $POD_NAME -- env
```
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=kubernetes-bootcamp-fb5c67579-4tfqn
KUBERNETES_SERVICE_PORT=443
KUBERNETES_SERVICE_PORT_HTTPS=443
KUBERNETES_PORT=tcp://10.96.0.1:443
KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
KUBERNETES_PORT_443_TCP_PROTO=tcp
KUBERNETES_PORT_443_TCP_PORT=443
KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
KUBERNETES_SERVICE_HOST=10.96.0.1
NPM_CONFIG_LOGLEVEL=info
NODE_VERSION=6.3.1
HOME=/root
```

4. $ kubectl exec -ti $POD_NAME -- bash
```
root@kubernetes-bootcamp-fb5c67579-4tfqn:/#
```

5. root@kubernetes-bootcamp-fb5c67579-4tfqn:/# cat server.js
```
var http = require('http');
var requests=0;
var podname= process.env.HOSTNAME;
var startTime;
var host;
var handleRequest = function(request, response) {
  response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200);
  response.write("Hello Kubernetes bootcamp! | Running on: ");
  response.write(host);
  response.end(" | v=1\n");
  console.log("Running On:" ,host, "| Total Requests:", ++requests,"| App Uptime:", (new Date() - startTime)/1000 , "seconds", "| Log Time:",new Date());
}
var www = http.createServer(handleRequest);
www.listen(8080,function () {
    startTime = new Date();;
    host = process.env.HOSTNAME;
    console.log ("Kubernetes Bootcamp App Started At:",startTime, "| Running On: " ,host, "\n" );
});
```

6. root@kubernetes-bootcamp-fb5c67579-4tfqn:/# curl localhost:8080
```
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-4tfqn | v=1
```
