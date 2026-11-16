```sh
kubectl get node --show-labels
# NAME                 STATUS   ROLES           AGE   VERSION   LABELS
# kind-control-plane   Ready    control-plane   9d    v1.31.0   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=kind-control-plane,kubernetes.io/os=linux,node-role.kubernetes.io/control-plane=,node.kubernetes.io/exclude-from-external-load-balancers=
# kind-worker          Ready    <none>          9d    v1.31.0   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=kind-worker,kubernetes.io/os=linux
# kind-worker2         Ready    <none>          9d    v1.31.0   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=kind-worker2,kubernetes.io/os=linux

 kubectl label node kind-worker storage=ssd
 kubectl get nodes --show-labels
# NAME                 STATUS   ROLES           AGE   VERSION   LABELS
# kind-control-plane   Ready    control-plane   12d   v1.31.0   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=kind-control-plane,kubernetes.io/os=linux,node-role.kubernetes.io/control-plane=,node.kubernetes.io/exclude-from-external-load-balancers=
# kind-worker          Ready    <none>          12d   v1.31.0   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=kind-worker,kubernetes.io/os=linux,storage=ssd
# kind-worker2         Ready    <none>          12d   v1.31.0   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=kind-worker2,kubernetes.io/os=linux

kubectl label node kind-worker env-
# node/kind-worker unlabeled

```
