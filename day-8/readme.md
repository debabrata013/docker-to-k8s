```bash
dev@debabrata-server:/k8s/svc$ kubectl apply -f backend.yml
# deployment.apps/backend-deployment created
# service/backend-svc created
dev@debabrata-server:/k8s/svc$ kubectl describe svc backend-svc
# Name:                     backend-svc
# Namespace:                default
# Labels:                   <none>
# Annotations:              <none>
# Selector:                 app=backend-app
# Type:                     ClusterIP
# IP Family Policy:         SingleStack
# IP Families:              IPv4
# IP:                       10.96.10.28
# IPs:                      10.96.10.28
# Port:                     <unset>  9090/TCP
# TargetPort:               5678/TCP
# Endpoints:                10.244.1.4:5678
# Session Affinity:         None
# Internal Traffic Policy:  Cluster
# Events:                   <none>
dev@debabrata-server:/k8s/svc$ kubectl run -it mynginx --image=nginx -- bin/sh

# curl backend-svc:9090
Hello from the backend!
#
```
