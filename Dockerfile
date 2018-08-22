FROM node

ENV PATH=/node_modules/.bin:$PATH
ENV GULP_MODE=production

COPY package.json /
RUN (cd / && npm install --production && rm -rf /tmp/*)

WORKDIR /app
CMD gulp