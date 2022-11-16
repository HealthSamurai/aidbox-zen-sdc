.PHONY: init up down stop update-aidbox-types

init:
	cd zrc && npm install

up:
	docker-compose pull
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down
