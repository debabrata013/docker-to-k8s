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
