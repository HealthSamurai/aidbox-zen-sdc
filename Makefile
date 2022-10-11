.PHONY: up down stop update-aidbox-types

up:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down
