FROM ubuntu:18.04

WORKDIR /myapp

RUN apt-get update && \
    apt-get install -y \
    python3.6 \
    python3-pip

COPY ./external_commands/requirements.txt /myapp/external_commands/

RUN pip3 install -r /myapp/external_commands/requirements.txt

ADD . /myapp
