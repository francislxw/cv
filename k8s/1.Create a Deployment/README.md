# Create a Deployment

1. $ kubectl create deployment hello-node --image=registry.cn-hangzhou.aliyuncs.com/google_containers/echoserver:1.4
```
deployment.apps/hello-node created
```
<img src="../docs/k8s.deployment.succeed.jpg" width="1000" height="600"> 

2. $ kubectl delete deployment hello-node
```
deployment.apps "hello-node" deleted
```
# Create a service

3. $ kubectl expose deployment hello-node --type=LoadBalancer --port=8080

4. $ kubectl get services
```
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
hello-node   LoadBalancer   10.97.247.80   <pending>     8080:32419/TCP   3m38s
kubernetes   ClusterIP      10.96.0.1      <none>        443/TCP          5h12m
```
