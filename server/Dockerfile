FROM node:18-alpine
RUN mkdir node_modules && chown -R node:node /user/src/app
COPY package.json .
COPY yarn.lock .
USER node
RUN yarn
COPY --chown=node:node . .
ENV NODE_ENV=production
RUN yarn gen
RUN yarn build
RUN yarn prisma migrate deploy
EXPOSE 5000
CMD [ "yarn", "start:prod" ]
