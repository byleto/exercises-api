start-with-logs:
	docker-compose up 

start:
	docker-compose up -d

stop: 
	docker-compose up -d	

remove-all:
	docker-compose down --rmi all

