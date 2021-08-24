# GCP - K8S - Nodejs - Firestore

## Overview
This repository contains a simple Rest API implemented with nodejs, and istructions how to deploy it to GCP Kubernetes Cluster.

## Steps
  1. Login to https://console.cloud.google.com/
  2. Create a new project **gcp-nodejs-firestore-k8s**
  3. Login to https://console.firebase.google.com/
  4. Click **Create project**, and choose the **gcp-nodejs-firestore-k8s** from a drop down options.
  5. Go to **Firestore Database** tab https://console.firebase.google.com/project/gcp-nodejs-firestore-k8s/firestore
  6. Click **Create database**,  choose **Start in test mode**, and complete the database creation.
  7. Go to **Project Overview** https://console.firebase.google.com/project/gcp-nodejs-firestore-k8s/overview
  8. Click **</>** icon to add Firebase to your web app.
  9. Set app nickname **nodejs-firebase** and click the **Register app** button.
  10. Remember/copy the **firebaseConfig** values, we will need later.
  11. Go back to **Google Console** https://console.cloud.google.com/home/dashboard?project=gcp-nodejs-firestore-k8s
  12. Open Terminal **>_**

#### Get Source Code
```
git clone https://github.com/igorya7v/gcp-nodejs-firestore-k8s.git
cd gcp-nodejs-firestore-k8s
```

## Update the config.js file with values from step 10 above
**Open GCP Terminal and navigate to the config.js file.**
**Populate the module.exports values with the values from the step 10.**
It's a temporal solution, later will be automated.

## Switch back to the GCP Terminal >_

#### Enable Container Registry to store the container image
```
gcloud services enable containerregistry.googleapis.com
```

#### Create the container image and push it to the Container Registry
```
gcloud builds submit --tag gcr.io/gcp-nodejs-firestore-k8s/nodejs-firestore-k8s-image:v1 .
```
You should be able to see the container image listed in the console by navigating to the Container Registry Images page in the Cloud Console. You now have a project-wide Docker image available, which Kubernetes can access and orchestrate


## Create K8s Cluster

#### Enable the related API
```
gcloud services enable compute.googleapis.com container.googleapis.com
```

#### Create a cluster with two n1-standard-1 nodes (it will take a few minutes to complete)
```
gcloud container clusters create nodejs-api-cluster --num-nodes 2 --machine-type n1-standard-1 --zone us-central1-c
```

#### Deploy the app to Kubernetes
```
kubectl create deployment nodejs-api --image=gcr.io/gcp-nodejs-firestore-k8s/nodejs-firestore-k8s-image:v1
```

#### Allow external traffic
```
kubectl create service loadbalancer nodejs-api --tcp=8080:8080
```

#### To find the publicly accessible IP address of the service, simply request kubectl to list all the cluster services
```
kubectl get services
NAME         CLUSTER-IP     EXTERNAL-IP      PORT(S)    AGE
nodejs-api   10.3.253.62    aaa.bbb.ccc.ddd  8080/TCP    1m
kubernetes   10.3.240.1     <none>           443/TCP    5m
```
**Note:** The **EXTERNAL-IP** may take several minutes to become available and visible. If the **EXTERNAL-IP** is missing, then wait a few minutes and try again.

You should now be able to reach the service by pointing your browser to http://<EXTERNAL_IP>:8080. 
In the example above, the external IP address is **aaa.bbb.ccc.ddd**

## Test the Deployed Nodejs API

#### Add Student
```
POST /api/student HTTP/1.1
Host: aaa.bbb.ccc.ddd:8080
Content-Type: application/json
Content-Length: 263

{
    "age": "27",
    "class": "CS",
    "fatherName": "father name",
    "firstName": "first name",
    "lastName": "last name",
    "phoneNumber": "123456789",
    "semester": 2,
    "status": "approved",
    "subject": "networking",
    "year": 3
}
```

#### Get all students
```
GET /api/students HTTP/1.1
Host: aaa.bbb.ccc.ddd:8080
```

#### Get student by id
```
GET /api/student/<studentId> HTTP/1.1
Host: aaa.bbb.ccc.ddd:8080
```

#### Updtae student
```
PUT /api/student/<studentId> HTTP/1.1
Host: aaa.bbb.ccc.ddd:8080
Content-Type: application/json
Content-Length: 260

{
    "age": "27",
    "class": "CS",
    "fatherName": "father name",
    "firstName": "first name",
    "lastName": "last name",
    "phoneNumber": "456789",
    "semester": 2,
    "status": "approved",
    "subject": "networking",
    "year": 3
}
```

#### Delete student
```
DELETE /api/student/<studentId> HTTP/1.1
Host: aaa.bbb.ccc.ddd:8080
```

## Clean up

```
gcloud container clusters delete nodejs-api-cluster --zone us-central1-c

gcloud container images delete gcr.io/gcp-nodejs-firestore-k8s/nodejs-firestore-k8s-image:v1
```

**Go to Firebase Console and delete the project**: https://console.firebase.google.com/


## TODO
  * Automated Deployment from GitHub triger
  * Provision the compute resource with Teraform





