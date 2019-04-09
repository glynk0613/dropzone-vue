# VENoM-Docker
Image uploader / browser (Vue, Express/Node Mongo with Docker-compose)


### Steps to Run

1. Navigate into the directory VENoM-Docker

> cd your-path-to/VENOM-Docker

2. Build Docker Images

> docker-compose build

3. Run the stack :)

> docker-compose up

Your app should be running on (if using native docker).: 

http://localhost:8080

Be patient and wait for all for all of the NPM warnings to finish - this will only happen once. Happy developing! 


### Configuration

There are 3 parts to this dockerized Vue app: Frontend (Vue), Backend (Node with Express), and Database (MongoDB).

The frontend is in the 'client' folder, backend in the 'server' folder, and the database is mounted to your current directory in the 'db' folder. 

NPM apps are a bit tricky to install in Docker, because the binaries have to be installed in the container. Though there are several solutions to this, I prefer the approach using the 'docker/entrypoint.sh' scripts that are in the 'client' and 'server' directories.


Be sure to change the environment variables (DATABASE_URL, API_URL) in docker-compose.yml according to your setup. Default should work if running on localhost.


