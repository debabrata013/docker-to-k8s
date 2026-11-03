 # Kubernetes Components

## Cluster overview

A Kubernetes cluster has a **control plane** and one or more **worker nodes**. The control plane manages the desired state of the cluster, while worker nodes run application Pods.

## Control plane components

### kube-apiserver

- The front end of Kubernetes and the main entry point for `kubectl`, controllers, and other clients.
- Authenticates and authorizes requests, validates resources, and communicates with `etcd`.

### etcd

- A consistent, distributed key-value store.
- Stores cluster configuration and state, including Pods, Services, Secrets, and desired workloads.
- Must be backed up and secured because the control plane depends on it.

### kube-scheduler

- Watches for Pods that do not have a node assigned.
- Selects a suitable worker node using resource capacity, taints and tolerations, affinity, and other scheduling rules.

### kube-controller-manager

- Runs controllers that compare the desired state with the actual state.
- Examples include Deployment, ReplicaSet, Node, Job, and EndpointSlice controllers.
- Takes corrective action, such as creating replacement Pods when a Pod fails.

### cloud-controller-manager

- Optional component for cloud environments.
- Integrates Kubernetes with cloud-specific services such as load balancers, routes, and node information.

## Worker node components

### kubelet

- Runs on every worker node.
- Receives Pod specifications and ensures that the containers are running and healthy.
- Reports node and Pod status to the API server.

### Container runtime

- Pulls container images and runs containers.
- Communicates with Kubernetes through the Container Runtime Interface (CRI).
- Common runtimes include `containerd` and CRI-O.

### kube-proxy

- Maintains networking rules for Kubernetes Services.
- Forwards Service traffic to backend Pods and provides basic load balancing.
- Some modern networking solutions replace or supplement it with eBPF.

### Pods

- The smallest deployable unit in Kubernetes.
- A Pod contains one or more closely related containers that share networking and storage.
- Deployments, StatefulSets, DaemonSets, and Jobs manage Pods on worker nodes.

## Kubernetes add-ons

Add-ons extend cluster functionality and commonly run as workloads in the `kube-system` namespace. They are optional, but most production clusters use several of them.

- **DNS:** CoreDNS provides service discovery and name resolution inside the cluster.
- **Metrics Server:** Provides resource metrics for `kubectl top` and Horizontal Pod Autoscaling.
- **Ingress controller:** Implements HTTP/HTTPS routing defined by Ingress resources. Examples include NGINX Ingress and Traefik.
- **Monitoring and logging:** Prometheus, Grafana, and Fluent Bit can collect metrics, dashboards, logs, and alerts.
- **Storage provisioner:** CSI drivers connect Kubernetes to storage systems and support dynamic PersistentVolume provisioning.
- **Dashboard:** Optional web interface for viewing cluster resources; it must be protected with authentication and RBAC.
- **Certificate manager:** Automates TLS certificate issuance and renewal.

Install only the add-ons required by the cluster and verify their compatibility with the Kubernetes version and CNI plugin.

## CNI (Container Network Interface)

CNI is a standard used to configure container networking. In Kubernetes, a CNI plugin connects Pods to the network and assigns them IP addresses.

### CNI responsibilities

- Allocate and release Pod IP addresses.
- Create the Pod network interface on the node.
- Provide Pod-to-Pod communication within and across nodes.
- Enforce `NetworkPolicy` when the plugin supports it.
- Optionally provide routing, encryption, observability, and load-balancing features.

### Common CNI plugins

- **Calico:** Provides routing and network policy, with optional eBPF support.
- **Cilium:** Uses eBPF for networking, security, and observability.
- **Flannel:** Provides simple overlay networking; policy usually requires another component.
- **Weave Net:** Provides overlay networking and policy features where supported.

### Important CNI notes

- A cluster should normally use one primary CNI plugin; multiple primary CNIs can conflict.
- The CNI must be installed and configured before Pods can communicate correctly.
- Pod CIDR ranges must not overlap with node, Service, or external network ranges.
- CNI configuration is commonly stored in `/etc/cni/net.d/`, with plugin binaries in `/opt/cni/bin/`.
- A `NetworkPolicy` has no effect unless the installed CNI plugin enforces it.

## Basic request flow

1. `kubectl` sends a request to the kube-apiserver.
2. The API server stores the desired state in `etcd`.
3. The scheduler assigns unscheduled Pods to worker nodes.
4. The kubelet asks the container runtime to start the containers.
5. The CNI plugin configures Pod networking and assigns IP addresses.
6. Controllers continuously reconcile the desired and actual cluster state.
