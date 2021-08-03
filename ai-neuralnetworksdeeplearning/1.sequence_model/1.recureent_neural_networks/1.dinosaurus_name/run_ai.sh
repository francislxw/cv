#!/bin/bash

docker run --rm -v $PWD:/myapp -w /myapp dinosaurus-name bash run_in_docker.sh
