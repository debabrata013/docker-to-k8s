
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
kubectl rollout history deployment nginx-deployment
kubectl rollout undo deployment nginx-deployment --to-revision=1

```
