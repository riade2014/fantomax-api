FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT 33300

ENV FIREBASE_API_KEY="AIzaSyA6Er3qwF5_wvWb1t_ntFUJKtvWtb-Chws"
CMD ["npm", "start"]
