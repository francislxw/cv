# Proxy is for the communicationn between Pods, Nodes, is filtered by label

$ kubectl proxy
```
Starting to serve on 127.0.0.1:8001
```

$ curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/

```
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-4tfqn | v=1
```
