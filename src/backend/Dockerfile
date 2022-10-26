FROM python:3.8-slim

LABEL MAINTAINER Mei Xie

# specify target dir
ENV APP_DIR=/app
WORKDIR ${APP_DIR}

# copy requirements first
COPY ./requirements.txt ${APP_DIR}/requirements.txt

# install requirements first (for caching)
RUN pip3 install -r ${APP_DIR}/requirements.txt
RUN python3 -m spacy download en_core_web_sm

# copy application code
COPY . ${APP_DIR}

# run application
CMD gunicorn --config=gunicorn.conf.py -k uvicorn.workers.UvicornWorker application:app
