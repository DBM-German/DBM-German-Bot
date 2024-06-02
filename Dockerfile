FROM node:20

# Create dbm-data mount directory and set "node" user as the owner
RUN mkdir /mnt/dbm-data
RUN chown -R node:node /mnt/dbm-data

# Create project directory and set "node" user as the owner
WORKDIR /home/node/app
RUN chown -R node:node /home/node/app
USER node

# Copy project files and set it up
COPY --chown=node:node ./bot/package.json ./package.json
RUN npm i --omit=dev
COPY --chown=node:node ./bot/ .

# Move custom data files to dbm-data mount directory
RUN mv ./data/players.json /mnt/dbm-data/players.json
RUN mv ./data/servers.json /mnt/dbm-data/servers.json
RUN mv ./data/globalVars.json /mnt/dbm-data/globalVars.json
RUN mv ./data/serverVars.json /mnt/dbm-data/serverVars.json

# Create symbolic links to custom data files
RUN ln -s /mnt/dbm-data/players.json ./data/players.json
RUN ln -s /mnt/dbm-data/servers.json ./data/servers.json
RUN ln -s /mnt/dbm-data/globalVars.json ./data/globalVars.json
RUN ln -s /mnt/dbm-data/serverVars.json ./data/serverVars.json

# Set up dbm-data mount and default execution command
VOLUME [ "/mnt/dbm-data" ]
CMD [ "node", "." ]
