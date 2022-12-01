.PHONY: up down stop

up:
	docker-compose pull
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down
