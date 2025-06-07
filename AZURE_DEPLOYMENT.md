# Child Tracker App - Azure Static Web Apps Deployment

This React application is configured for deployment to Azure Static Web Apps.

## Deployment Instructions

### Create an Azure Static Web App
1. Log in to the [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" and search for "Static Web App"
3. Fill in the required details:
   - Subscription: Choose your Azure subscription
   - Resource Group: Create new or use existing
   - Name: child-tracker-app
   - Hosting Plan: Free
   - Region: Choose the region closest to your users
   - Source: GitHub (connect your GitHub account)
   - Organization: Your GitHub organization/username
   - Repository: Select the repository containing this code
   - Branch: main

4. Click "Review + create" and then "Create"

### After Deployment
Once deployment is complete, your application will be available at the URL provided by Azure Static Web Apps. Note that the GitHub workflow will be automatically created in your repository.

### Environment Variables
If you need to add environment variables, you can do so through the Azure Portal:
1. Navigate to your Static Web App resource
2. In the left sidebar, under "Settings", click "Configuration"
3. Add your environment variables as needed

### Custom Domains
To add a custom domain:
1. Navigate to your Static Web App resource
2. In the left sidebar, under "Settings", click "Custom domains"
3. Follow the instructions to add and verify your domain

## Local Development
To run this application locally:

```bash
npm install
npm start
```

The application will be available at http://localhost:3000/
