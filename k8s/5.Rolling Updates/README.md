# Rolling Updates 

Rolling allows Deployments' update to take place with zero downtime by incrementally updating Pods instances with new ones. The new Pods will be scheduled on Nodes with available resources.

Rolling updates allow the following actions:

Promote an application from one environment to another (via container image updates)

Rollback to previous versions

Continuous Integration and Continuous Delivery of applications with zero downtime

### API
1. $ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
```
deployment.apps/kubernetes-bootcamp image updated
```
