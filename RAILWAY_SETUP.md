# Railway Deployment Setup

## Environment Variables to Set in Railway Dashboard

Go to your Railway project dashboard and set these environment variables:

### Required Environment Variables:
```bash
NODE_ENV=production
PORT=8080
DB_HOST=your-mysql-host.railway.internal
DB_USER=root
DB_PASSWORD=your-database-password
DB_NAME=railway
```

### Database Setup:
1. Add MySQL service in Railway
2. Copy the connection details from Railway MySQL service
3. Update the environment variables above with your actual values

### Important Notes:
- Don't set PORT=3306 (that's MySQL port, not your app port)
- Railway automatically assigns PORT, but you can override it
- Use the internal Railway MySQL hostname (ends with .railway.internal)

### To Deploy:
1. Connect your GitHub repo to Railway
2. Set the environment variables above
3. Railway will automatically build and deploy

### Frontend CORS:
Update the CORS origin in server.js with your actual GitHub Pages domain:
```javascript
origin: [
  'https://your-username.github.io',  // Replace with your actual domain
  'https://localhost:3000'
]
```

### Testing Endpoints:
- GET /  → Health check
- POST /api/register → User registration
- POST /api/login → User login
- POST /api/logout → User logout
- POST /api/tasks/add → Add task
- POST /api/tasks/render → Get tasks
- POST /api/tasks/delete → Delete task
