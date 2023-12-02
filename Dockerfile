FROM node:18

WORKDIR /home/node/app
RUN chown -R node:node /home/node/app
USER node

COPY --chown=node:node ./bot/ .

RUN npm i --omit=dev

VOLUME [ "/home/node/app/data" ]

CMD [ "node", "." ]