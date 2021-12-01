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

3. $ kubectl get pods -l app=kubernetes-bootcamp (to get pods by label)
```
NAME                                  READY   STATUS    RESTARTS   AGE
kubernetes-bootcamp-fb5c67579-lpdms   1/1     Running   0          13m
```
