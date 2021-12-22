#!/bin/sh

# stopping and deleting all containers:
docker container stop frontend
docker container rm frontend

docker container stop dataservice
docker container rm dataservice

docker container stop userservice
docker container rm userservice

# removing all images:
docker image rm faebs/to_frontend
docker image rm faebs/to_dataservice
docker image rm faebs/to_userservice

# going to each subfolder and building + running every service in docker
cd trockenobst_userservice
docker build . -t faebs/to_userservice
docker run --rm -d  -p 3001:3001/tcp --name userservice faebs/to_userservice:latest 

cd ..
cd trockenobst_dataservice
docker build . -t faebs/to_dataservice
docker run --rm -d  -p 3000:3000/tcp --name dataservice faebs/to_dataservice:latest 

cd ..
cd trockenobst_frontend
docker build . -t faebs/to_frontend
docker run --rm -d  -p 8080:8080/tcp --name frontend faebs/to_frontend:latest 

firefox http://127.0.0.1:8080