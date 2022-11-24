.PHONY: up down stop

up:
	docker-compose up -d --pull always

stop:
	docker-compose stop

down:
	docker-compose down
