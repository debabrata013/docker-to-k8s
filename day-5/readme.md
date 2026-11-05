```bash
kubectl apply -f rc/rc.yml
 kubectl get pods --show-labels
kubectl describe rc nginx-rc
 kubectl get rc -o yml
 kubectl scale rc nginx-rc --replicas 5
 kubectl set image rc nginx-rc nginx=1.22
 kubectl edit rc nginx-rc

#  to see the api services
kubectl api-resources
```

```bash
kubectl rollout -h
# Valid resource types include:

#   *  deployments
#   *  daemonsets
#   *  statefulsets
Available sub Commands:
  history       View rollout history
  pause         Mark the provided resource as paused
  restart       Restart a resource
  resume        Resume a paused resource
  status        Show the status of the rollout
  undo          Undo a previous rollout

 kubectl rollout SUBCOMMAND [options]
 kubectl rollout history deployment nginx-deployment


#  rolling update
kubectl set image deployments nginx-deployment containername=nginx1.22
kubectl annotate deployments.apps nginx-deployment kubernetes.io/change-cause="update the nginx from v1.19 to 1.22 "

```
