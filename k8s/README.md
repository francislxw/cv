# k8s demo

## Installation guide on Mac OS

1. $curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/v1.6.4/bin/linux/amd64/kubectl
chmod +x kubectl

2. $bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"

3. $brew install minikube

4. $curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-hyperkit && chmod +x docker-machine-driver-hyperkit && sudo mv docker-machine-driver-hyperkit /usr/local/bin/ && sudo chown root:wheel /usr/local/bin/docker-machine-driver-hyperkit && sudo chmod u+s /usr/local/bin/docker-machine-driver-hyperkit

5. $brew install docker-machine-driver-hyperkit

6. $brew link minikube

7. $minikube delete

8. $minikube start --image-mirror-country='cn' --driver docker --image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers

&emsp;&emsp;It comes the successful result:

&emsp;&emsp;<img src="docs/k8s.succeed.jpg" width="600" height="290"> 

### Further verifying the result

by $ kubectl get po -A

```
luoxi@XIAWUs-MacBook-Pro exercises % kubectl get po -A
NAMESPACE     NAME                               READY   STATUS    RESTARTS   AGE
kube-system   coredns-7d89d9b6b8-lh9jr           1/1     Running   0          102m
kube-system   etcd-minikube                      1/1     Running   0          102m
kube-system   kube-apiserver-minikube            1/1     Running   0          102m
kube-system   kube-controller-manager-minikube   1/1     Running   0          102m
kube-system   kube-proxy-78j4z                   1/1     Running   0          102m
kube-system   kube-scheduler-minikube            1/1     Running   0          102m
kube-system   storage-provisioner                1/1     Running   0          102m
```

### Enabling dashboard 

by $ minikube dashboard

<img src="docs/k8s.succeed3.dashboard.cmd.jpg" width="600" height="120">
<br>
<img src="docs/k8s.succeed3.dashboard.jpg" width="1000" height="250">
