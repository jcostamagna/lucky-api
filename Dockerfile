FROM nikolaik/python-nodejs:latest

WORKDIR /app

# Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
COPY . .

# For NPM use: `RUN npm ci`
RUN yarn install

# Copy important files - Add ormconfig.ts here if using Typeorm
COPY . .

# Copy env
#COPY .env.docker /var/www/backend/.env
CMD ["yarn", "start"]