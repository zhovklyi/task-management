# Development stage for Vue.js
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 5173 (Vite dev server default)
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
