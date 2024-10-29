FROM node:14-alpine
WORKDIR C:\Users\ACHER\pschool\app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm build
RUN npm prun --production
CMD ["node", ".dist/main.js"]
