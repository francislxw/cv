# Rolling Updates 

Rolling allows Deployments' update to take place with zero downtime by incrementally updating Pods instances with new ones. The new Pods will be scheduled on Nodes with available resources.

### Rolling updates allow the following actions:

Promote an application from one environment to another (via container image updates)

Rollback to previous versions

Continuous Integration and Continuous Delivery of applications with zero downtime

### API
1. $ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
```
deployment.apps/kubernetes-bootcamp image updated
```

2. $ kubectl get pods
```
NAME                                   READY   STATUS        RESTARTS   AGE
kubernetes-bootcamp-7d44784b7c-c9889   1/1     Running       0          8s
kubernetes-bootcamp-7d44784b7c-mm6jm   1/1     Running       0          16s
kubernetes-bootcamp-7d44784b7c-ncx6p   1/1     Running       0          15s
kubernetes-bootcamp-7d44784b7c-ttsqt   1/1     Running       0          8s
kubernetes-bootcamp-fb5c67579-5zxjz    1/1     Terminating   0          3m11s
kubernetes-bootcamp-fb5c67579-8h8hx    1/1     Terminating   0          3m11s
kubernetes-bootcamp-fb5c67579-hqqrh    1/1     Terminating   0          3m11s
kubernetes-bootcamp-fb5c67579-w6rx4    1/1     Terminating   0          3m11s
```

# Verify an update

3. $ curl $(minikube ip):$NODE_PORT
```
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-7d44784b7c-mm6jm | v=2
```

4. $ kubectl rollout status deployments/kubernetes-bootcamp
```
deployment "kubernetes-bootcamp" successfully rolled out
```

5. $ kubectl describe pods
```
Name:         kubernetes-bootcamp-7d44784b7c-c9889
Namespace:    default
...
Controlled By:  ReplicaSet/kubernetes-bootcamp-7d44784b7c
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://791f89d19f6882316b823a55a839c5bfde35024ce1c2a5ba4c6a47488a9e706a
    Image:          jocatalin/kubernetes-bootcamp:v2
...
```
