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