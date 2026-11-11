```sh
kubectl create ns app1-ns --dry-run=client -o yaml > ns.yml
kubectl apply -f ns.yml
kubectl apply -f . -n=app1-ns

# to get to know where the specific field will be weiten then for a running object
kubectl get deployments.app -n app1-ns backend-deploy -o yaml

kubectl config context -h
kubectl config set-context --current --namespace=app1-ns
```
```sh
kubectl config set-context  --current --namespace=default

```
