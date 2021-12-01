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
