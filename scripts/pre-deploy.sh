#!/bin/bash

# Pre-build check script for Azure Static Web Apps deployment

echo "🔍 Running pre-build checks for Azure Static Web Apps deployment..."

# Check if node and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14 or higher."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

# Check node version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ $NODE_MAJOR_VERSION -lt 14 ]; then
    echo "❌ Node.js version 14 or higher is required. Current version: $NODE_VERSION"
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Check if all dependencies are installed
echo "📦 Checking dependencies..."
npm ci

# Check if build command works
echo "🏗️ Testing build command..."
npm run build -- --profile

if [ $? -ne 0 ]; then
    echo "❌ Build failed. See errors above."
    exit 1
fi

echo "✅ Build successful!"
echo "🚀 Ready for deployment to Azure Static Web Apps!"

# Clean up build folder to avoid uploading it to git
rm -rf build

echo "🧹 Cleaned up build folder."
echo "📝 For deployment instructions, see AZURE_DEPLOYMENT.md"
