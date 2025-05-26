FROM ubuntu:latest
LABEL Description="JDMB development environment"

RUN apt update -y
RUN apt install -y g++ make cmake gdb git unzip wget curl ca-certificates

# install docker and docker compose

RUN install -m 0755 -d /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
RUN chmod a+r /etc/apt/keyrings/docker.asc

RUN echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null

RUN apt-get update
RUN apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# confirm installation

RUN docker --version
RUN docker compose version

# install node and npm

RUN curl -fsSL https://deb.nodesource.com/setup_23.x | bash

RUN apt-get update
RUN apt-get install -y nodejs

# confirm installation

RUN node -v
RUN npm -v

# install flatbuffers compiler

RUN git clone https://github.com/google/flatbuffers.git \
    && cd flatbuffers \
    && cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release \
    && make -j4 \
    && make install

# install required C++ libraries

RUN git clone https://github.com/Tencent/rapidjson.git \
    && cd rapidjson \
    && mkdir build \
    && cd build \
    && cmake .. \
    && make install

RUN echo "/usr/local/lib" > "/etc/ld.so.conf.d/999local.conf"
RUN ldconfig

RUN rm -r rapidjson
RUN rm -r flatbuffers

# keep container from immediately exiting

CMD [ "tail", "-F", "VqKVJUkBQKmcNkfC" ]