FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install @next/swc-linux-x64-gnu
RUN npm install @next/swc-linux-x64-gnux32
RUN npm install @next/swc-linux-x64-musl
RUN yarn install


COPY . .

CMD ["yarn", "dev"]
