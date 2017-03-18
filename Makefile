


all:

build-compose:
	docker-compose -f docker-compose.yaml -p seneca-base build

	docker-compose -f docker-compose.yaml -p seneca-checkuserservice build

	docker-compose -f docker-compose.yaml -p seneca-getuserservice build


run-compose:

	docker-compose -f docker-compose.yaml -p seneca-base up -d --remove-orphans

	docker-compose -f docker-compose.yaml -p seneca-checkuserservice up -d --remove-orphans

	docker-compose -f docker-compose.yaml -p seneca-getuserservice up -d --remove-orphans


build:
	make -C dockers/base build
	make -C dockers/client2 build
	make -C dockers/client3 build



run-base:
	 docker run -ti --network=host --name SenecaBase  seneca-base


run-client2:
	 docker run -ti --network=host --name CheckUserService  seneca-checkuserservice


run-client3:
	 docker run -ti --network=host --name GetUserService  seneca-getuserservice