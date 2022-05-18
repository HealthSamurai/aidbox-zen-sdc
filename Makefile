.PHONY: up down stop update-aidbox-types

up:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

update-aidbox-types:
	docker-compose -f docker-compose.yaml -f docker-compose.aidbox-ts.yaml run --rm aidbox-ts-generator
	cd frontend && pnpm prettier --write src/contrib/aidbox.ts
