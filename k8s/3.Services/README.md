# Services - Expose Your App publicly

1. $ kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
```
service/kubernetes-bootcamp exposed
```

2. $ kubectl describe services/kubernetes-bootcamp
```
Name:                     kubernetes-bootcamp
Namespace:                default
Labels:                   app=kubernetes-bootcamp
Annotations:              <none>
Selector:                 app=kubernetes-bootcamp
Type:                     NodePort
IP Families:              <none>
IP:                       10.98.236.31
IPs:                      10.98.236.31
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30227/TCP
Endpoints:                172.18.0.3:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

3. $ kubectl get pods -l app=kubernetes-bootcamp (get pods by label)
```
NAME                                  READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-fb5c67579-lpdms   1/1     Running   0          13m
```

4. $ kubectl get services -l app=kubernetes-bootcamp (get services by label)
```
NAME                  TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
kubernetes-bootcamp   NodePort   10.96.248.82   <none>        8080:30178/TCP   14m
```

5. $ kubectl label pods $POD_NAME version=v1 (apply a new label v1 to the node)
```
pod/kubernetes-bootcamp-fb5c67579-lpdms labeled
```

6. $ kubectl describe pods $POD_NAME (validate, we see v1 is attached to the pod's label)
```
Name:         kubernetes-bootcamp-fb5c67579-lpdms
Namespace:    default
Priority:     0
Node:         minikube/172.17.0.78
Start Time:   Wed, 01 Dec 2021 02:14:37 +0000
Labels:       app=kubernetes-bootcamp
              pod-template-hash=fb5c67579
              version=v1
```

7. $ kubectl delete service -l app=kubernetes-bootcamp (delete a service)
```
service "kubernetes-bootcamp" deleted
```

8. $ curl 10.96.248.82:8080   (Can't access the exposed port anymore)
```
curl: (7) Failed to connect to 10.96.248.82 port 8080: Connection timed out
```

9. $ kubectl exec -ti $POD_NAME -- curl localhost:8080 (but we still can access it inside the container)
```
Hello Kubernetes bootcamp! | Running on: kubernetes-bootcamp-fb5c67579-lpdms | v=1
```
