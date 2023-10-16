FROM node:18

WORKDIR /home/node/app
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
USER node

COPY --chown=node:node ./bot/ .

RUN npm i --omit=dev

CMD [ "node", "." ]