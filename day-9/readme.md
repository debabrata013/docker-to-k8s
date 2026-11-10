```bash
kubectl create deployment -h
kubectl create deployment backend-deployment-dev --image=hashicorp/http-echo --replicas=2 --port=5678 --dry-run=client



kubectl expose deployment -h

 kubectl expose deployment backend-deployment-dev --type=ClusterIP --port=9000 --target-port=5678 --dry-run=client -o yaml >> backend.yaml

```

### Flags

- `--dry-run=client` builds and validates the Deployment locally without creating it in the Kubernetes cluster. Add `-o yaml` to print the generated manifest.
- `--port=5678` records the container port in the Deployment specification. It is metadata/documentation only; it does not expose the port or create a Service.


practice the k8s services and also understand how to generate the yml from the imparative commands , how to validate the imparative command using the dryrun flag
