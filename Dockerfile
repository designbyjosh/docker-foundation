FROM node

ENV PATH=/node_modules/.bin:$PATH
ENV GULP_MODE=production

COPY package.json /
RUN (cd / && npm install --production && npm audit fix && rm -rf /tmp/*)

COPY gulpfile.js /app/

WORKDIR /app

CMD gulp