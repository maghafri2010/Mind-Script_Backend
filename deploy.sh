#!/bin/bash

# Railway deployment script
# This script runs during Railway deployment to set up the database

echo "🚀 Starting Railway deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run database setup
echo "🗄️ Setting up database..."
npm run setup-db

# Start the application
echo "🌟 Starting application..."
npm start
