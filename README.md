# Exercises API documentation

## Starts the API
Run the API with Mysql Server:
```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

Run on the background with command:
```bash
docker-compose up -d
```

## Stop the API
Stopping all the running containers:
```bash
docker-compose down
```

Stop and remove all containers, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```