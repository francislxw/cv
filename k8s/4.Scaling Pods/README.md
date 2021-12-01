# Scaling Your App

1. $ kubectl get rs (see the ReplicaSet created by the Deployment)
```
NAME                            DESIRED   CURRENT   READY   AGE
kubernetes-bootcamp-fb5c67579   1         1         1       90s
```

2. $ kubectl scale deployment/kubernetes-bootcamp --replicas=4
```
deployment.apps/kubernetes-bootcamp scaled
```

3. $ kubectl get deployments
```
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   4/4     4            4           13m
```

4. $ kubectl get pods -o wide (check if the number of Pods changed)
```
NAME                                  READY   STATUS    RESTARTS   AGE     IP           NODE       NOMINATED NODE   READINESS GATES
kubernetes-bootcamp-fb5c67579-2zfmk   1/1     Running   0          14m     172.18.0.4   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-4l7g8   1/1     Running   0          9m10s   172.18.0.9   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-vc6rc   1/1     Running   0          9m10s   172.18.0.8   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-x645d   1/1     Running   0          9m10s   172.18.0.7   minikube   <none>           <none>
```

5. $ kubectl describe deployments/kubernetes-bootcamp
```
Name:                   kubernetes-bootcamp
Namespace:              default
CreationTimestamp:      Wed, 01 Dec 2021 03:15:51 +0000
Labels:                 app=kubernetes-bootcamp
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=kubernetes-bootcamp
Replicas:               4 desired | 4 updated | 4 total | 4 available | 0 unavailable
...
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Progressing    True    NewReplicaSetAvailable
  Available      True    MinimumReplicasAvailable
OldReplicaSets:  <none>
NewReplicaSet:   kubernetes-bootcamp-fb5c67579 (4/4 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  16m   deployment-controller  Scaled up replica set kubernetes-bootcamp-fb5c67579 to 1
  Normal  ScalingReplicaSet  11m   deployment-controller  Scaled up replica set kubernetes-bootcamp-fb5c67579 to 4
```

### Load Balancing
6 $ curl 172.17.0.36:30105
```
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-4l7g8 | v=1
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-2zfmk | v=1
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-2zfmk | v=1
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-vc6rc | v=1
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-2zfmk | v=1
```
We hit a different Pod with every request. This demonstrates that the load-balancing is working.

### Scale Down

7. $ kubectl scale deployments/kubernetes-bootcamp --replicas=2
```
deployment.apps/kubernetes-bootcamp scaled
```

8. $ kubectl get deployments
```
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
kubernetes-bootcamp   2/2     2            2           55m
```

9. $ kubectl get pods -o wide
```
NAME                                  READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
kubernetes-bootcamp-fb5c67579-2zfmk   1/1     Running   0          57m   172.18.0.4   minikube   <none>           <none>
kubernetes-bootcamp-fb5c67579-4l7g8   1/1     Running   0          51m   172.18.0.9   minikube   <none>           <none>
```
The number of replicas decreased to 2, this confirms that 2 Pods were terminated.
