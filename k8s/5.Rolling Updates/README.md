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
# Rollback an update
6. $ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10
```
deployment.apps/kubernetes-bootcamp image updated
```

7. $ kubectl get pods
```
NAME                                   READY   STATUS             RESTARTS   AGE
kubernetes-bootcamp-59b7598c77-gwkhr   0/1     ImagePullBackOff   0          104s
kubernetes-bootcamp-59b7598c77-pnl4v   0/1     ImagePullBackOff   0          104s
kubernetes-bootcamp-7d44784b7c-c9889   1/1     Running            0          13m
kubernetes-bootcamp-7d44784b7c-mm6jm   1/1     Running            0          13m
kubernetes-bootcamp-7d44784b7c-ncx6p   1/1     Running            0          13m
```
8. $ kubectl describe pods
```
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  14m   default-scheduler  Successfully assigned default/kubernetes-bootcamp-7d44784b7c-ncx6p to minikube
  Normal  Pulled     14m   kubelet            Container image "jocatalin/kubernetes-bootcamp:v2" already present on machine
  Normal  Created    14m   kubelet            Created container kubernetes-bootcamp
  Normal  Started    14m   kubelet            Started container kubernetes-bootcamp
$
```

9. $ kubectl rollout undo deployments/kubernetes-bootcamp
```
deployment.apps/kubernetes-bootcamp rolled back
```

10. $ kubectl get pods
```
NAME                                   READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-7d44784b7c-c9889   1/1     Running   0          28m
kubernetes-bootcamp-7d44784b7c-mm6jm   1/1     Running   0          28m
kubernetes-bootcamp-7d44784b7c-ncx6p   1/1     Running   0          28m
kubernetes-bootcamp-7d44784b7c-nrxm8   1/1     Running   0          2m16s
```

Four Pods are running,the deployment is once again using a stable version of the app (v2). The rollback was successful.
