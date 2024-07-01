FROM python:3.10-slim as build

ENV APP_GROUP=app \
    APP_USER=app

RUN DEBIAN_FRONTEND=noninteractive apt-get -qq update \
    && apt-get install -qq ca-certificates gettext git libxmlsec1-dev gcc gnupg2 libpq-dev xz-utils \
    && pip install pipenv \
    && groupadd ${APP_GROUP} \
    && useradd -m -g ${APP_GROUP} ${APP_USER} \
    && echo -n "America/Toronto" > /etc/timezone

RUN curl https://nodejs.org/dist/v20.15.0/node-v20.15.0-linux-x64.tar.xz -O

RUN tar -xf node-v20.15.0-linux-x64.tar.xz

ENV PATH="/node-v20.15.0-linux-x64/bin:${PATH}"

RUN mkdir /app
WORKDIR /app

ADD . /app
RUN cd client && npm i && npm run build
RUN pipenv install --ignore-pipfile --system --deploy
RUN python generate-instructions.py

EXPOSE 5001

CMD gunicorn wsgi:app -w 2 -b :5001
