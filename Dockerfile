FROM node

ENV PATH=/node_modules/.bin:$PATH
ENV GULP_MODE=production

WORKDIR /app
CMD gulp