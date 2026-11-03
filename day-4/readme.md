 # kind (Kubernetes IN Docker) – Useful Commands

`kind` runs local Kubernetes clusters using Docker containers.

## Install

```bash
# macOS
brew install kind kubectl

# Verify installations
kind version
kubectl version --client
```

## Cluster management

```bash
# Create a cluster named kind
kind create cluster --name dev

# Create a cluster with a configuration file
kind create cluster --name dev --config kind-config.yaml

# List clusters
kind get clusters

# Show cluster nodes
kubectl get nodes

# Use a specific cluster context
kubectl config use-context kind-dev

# Delete a cluster
kind delete cluster --name dev
```

## Work with images

```bash
# Build an image locally
docker build -t myapp:dev .

# Load the image into kind
kind load docker-image myapp:dev --name dev

# List images available in a kind node
docker exec -it dev-control-plane crictl images
```

For locally loaded images, use `imagePullPolicy: IfNotPresent` in the Kubernetes manifest.

## Common kubectl commands

```bash
kubectl get pods -A
kubectl get svc
kubectl get deployments
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl logs -f <pod-name>
kubectl apply -f <manifest.yaml>
kubectl delete -f <manifest.yaml>
kubectl get events --sort-by=.metadata.creationTimestamp
```

## Imparativly creating the pods
```bash
kubectl run pod-name --image=nginx
kubectl get pod
# if done using the yaml
kubectl apply -f fileloaction.yml
kubectl get pod -o wide
kubectl describe object-name
kubectl logs pod-name
kubectl logs pod-name -c container-name # if we have multiple container
kubectl delete pods pod-name
```

## how to run comands inside the pod using --
# --: Indicates the end of kubectl options and the start of the command to execute inside the container.
```sh
kubectl exec my-pod-2 -- ls
kubectl exec my-pod-2 -c container-name -- ls
# login into the pods
kubectl exec -it my-pod2 -- /bin/bash
kubectl exec -it my-pod-2 -c container-name -- /bin/bash


```


## Access a service

```bash
# Forward a local port to a service
kubectl port-forward service/<service-name> 8080:80

# Open a shell in a pod
kubectl exec -it <pod-name> -- sh
```

## Troubleshooting

```bash
# View kind node containers
docker ps --filter label=io.x-k8s.kind.role

# Export cluster logs
kind export logs ./kind-logs --name dev

# Check the current Kubernetes context
kubectl config current-context
```

