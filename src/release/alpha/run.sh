#!/bin/bash
/etc/init.d/mysql stop
docker-compose -f docker-compose-dev.yml build
docker-compose -f docker-compose-dev.yml up
