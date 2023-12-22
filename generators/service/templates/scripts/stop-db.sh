containerName=mongo-node-1

checkContainer=$(docker ps -a -q --filter "name=^${containerName}$")

# check if the container has already been running
if [ ! "${checkContainer}" ]; then
    echo "database container is not running, no need to stop it"
fi

# Stop the Docker Container.
# We are just stopping the Docker Container instead of removing it so the 
# replica set under the Docker Volume would still point to the correct Docker 
# Instance ID.
docker stop db