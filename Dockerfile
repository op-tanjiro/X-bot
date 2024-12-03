FROM node:20

RUN git clone https://github.com/Mek-d1/X-bot.git /root/Mek-d1

# Clear npm cache and remove node_modules directories
RUN npm cache clean --force
RUN rm -rf /root/Mek-d1/node_modules

# Install dependencies
WORKDIR /root/Mek-d1
RUN npm install

# Add additional Steps To Run...
EXPOSE 3000
CMD ["npm","start" ]
# IF YOU ARE MODIFYING THIS BOT DONT CHANGE THIS  RUN rm -rf /root/Mek-d1/node_modules
