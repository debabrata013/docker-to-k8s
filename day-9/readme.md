```bash
kubectl create deployment -h
kubectl create deployment backend-deployment-dev --image=hashicorp/http-echo --replicas=2 --port=5678 --dry-run=client



kubectl expose deployment -h

 kubectl expose deployment backend-deployment-dev --type=ClusterIP --port=9000 --target-port=5678 --dry-run=client -o yaml >> backend.yaml

```

### Flags

- `--dry-run=client` builds and validates the Deployment locally without creating it in the Kubernetes cluster. Add `-o yaml` to print the generated manifest.
- `--dry-run=server` sends the request to the Kubernetes API server for validation and admission processing without persisting the resource.


- `--port=5678` records the container port in the Deployment specification. It is metadata/documentation only; it does not expose the port or create a Service.





```sh
kubectl get nodes
# NAME                 STATUS   ROLES           AGE     VERSION
# kind-control-plane   Ready    control-plane   6d23h   v1.31.0
# kind-worker          Ready    <none>          6d23h   v1.31.0
# kind-worker2         Ready    <none>          6d23h   v1.31.0


```
