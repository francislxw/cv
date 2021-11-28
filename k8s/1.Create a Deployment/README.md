# Create a Deployment

1. $ kubectl create deployment hello-node --image=registry.cn-hangzhou.aliyuncs.com/google_containers/echoserver:1.4
```
deployment.apps/hello-node created
```
<img src="../docs/k8s.deployment.succeed.jpg" width="700" height="400"> 

$ kubectl delete deployment hello-node
```
deployment.apps "hello-node" deleted
```

