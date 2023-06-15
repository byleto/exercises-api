# Exercises API documentation

## Starts the API
Run the API with Mysql Server:
```bash
make start-with-logs
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

Run on the background with command:
```bash
make start
```

## Stop the API
Stopping all the running containers:
```bash
make stop
```

Stop and remove all containers, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
make remove-all
```

## Other commands
### Run the unit tests:
Note: Run from the src folder. 
```bash
    npm test
```
Runs the unit tests and shows the coverage report

### Run the integration tests:
Note: To run the ingration is required to have the API running and be on the src folder. 
```bash
    npm run test:integration
```


