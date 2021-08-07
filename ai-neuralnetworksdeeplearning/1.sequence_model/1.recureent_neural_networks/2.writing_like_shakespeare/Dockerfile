# Copyright 2019 The TensorFlow Authors. All Rights Reserved.
ARG UBUNTU_VERSION=18.04

FROM ubuntu:${UBUNTU_VERSION} as base

RUN apt-get update && apt-get install -y curl

# See http://bugs.python.org/issue19846
ENV LANG C.UTF-8

RUN apt-get update && apt-get install -y \
    python3.8 \
    python3-pip

RUN python3 -m pip --no-cache-dir install --upgrade \
    "pip<20.3" \
    setuptools

# Some TF tools expect a "python" binary
RUN ln -s $(which python3) /usr/local/bin/python

# Options:
#   tensorflow
#   tensorflow-gpu
#   tf-nightly
#   tf-nightly-gpu
# Set --build-arg TF_PACKAGE_VERSION=1.11.0rc0 to install a specific version.
# Installs the latest version by default.
ARG TF_PACKAGE=tensorflow-aarch64
ARG TF_PACKAGE_VERSION=

COPY bashrc /etc/bash.bashrc
RUN chmod a+rwx /etc/bash.bashrc

COPY ./external_commands/requirements.txt /myapp/external_commands/

ADD . /myapp

RUN apt-get install -y pkg-config libhdf5-dev
RUN python3 -m pip install --no-cache-dir /myapp/tensorflow-2.3.1-cp36-cp36m-linux_aarch64.whl

RUN pip3 install -r /myapp/external_commands/requirements.txt