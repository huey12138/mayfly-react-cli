#!/bin/bash

containerName=mongo-node-1

# Pull the latest MongoDB image
docker pull mongo

# Create a Docker network for the replica set
docker network create mongo-replica-set

# Start three MongoDB containers for the replica set
docker run -d --name mongo-node-1 --net mongo-replica-set -p 27018:27017 mongo --replSet mongo-node-set
# docker run -d --name mongo-node-2 --net mongo-replica-set -p 27019:27017 mongo --replSet mongo-node-set
# docker run -d --name mongo-node-3 --net mongo-replica-set -p 27020:27017 mongo --replSet mongo-node-set


# Connect to the primary node and initialize the replica set
docker exec $containerName  mongo --port 27018 <<EOF
rs.initiate()
EOF


# # Add the other two nodes to the replica set
# docker exec $containerName  mongo --port 27018 <<EOF
# rs.add("mongo-node-2:27019")
# rs.add("mongo-node-3:27020")
# EOF


# Verify that the replica set is working correctly
docker exec $containerName  mongo --port 27018 <<EOF
rs.status()
EOF