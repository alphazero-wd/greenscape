FROM node:18-alpine
WORKDIR /user/src/app
RUN mkdir node_modules && chown -R node:node /user/src/app
COPY package.json .
COPY yarn.lock .
USER node
RUN yarn
COPY --chown=node:node . .
ENV NODE_ENV=production
RUN yarn gen
RUN yarn build
EXPOSE 5000
CMD [ "yarn", "prisma", "migrate", "deploy", "&&", "yarn", "start:prod" ]
