# =========================
# BASE IMAGE
# =========================
FROM node:20-alpine

# =========================
# WORKDIR
# =========================
WORKDIR /app

# =========================
# COPY PACKAGE FILES
# =========================
COPY package*.json ./

# =========================
# NPM SETTINGS
# =========================
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set fetch-retry-mintimeout 20000

# =========================
# INSTALL
# =========================
RUN npm install

# =========================
# COPY PROJECT
# =========================
COPY . .

# =========================
# BUILD
# =========================
RUN npm run build

# =========================
# PORT
# =========================
EXPOSE 3000

# =========================
# START
# =========================
CMD ["npm", "start"]