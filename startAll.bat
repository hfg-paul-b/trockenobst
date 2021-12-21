docker container stop frontend
docker container rm frontend

docker container stop dataservice
docker container rm dataservice

docker container stop userservice
docker container rm userservice

faebs/to_frontend
docker image rm faebs/to_dataservice
docker image rm faebs/to_userservice

cd trockenobst_userservice
docker build . -t faebs/to_userservice
docker run --rm -d  -p 3001:3001/tcp faebs/to_userservice:latest --name userservice

cd ..
cd trockenobst_dataservice
docker build . -t faebs/to_dataservice
docker run --rm -d  -p 3000:3000/tcp faebs/to_dataservice:latest --name dataservice

cd ..
cd trockenobst_frontend
docker build . -t faebs/to_frontend
docker run --rm -d  -p 8080:8080/tcp faebs/to_frontend:latest --name frontend

firefox http://127.0.0.1:8080