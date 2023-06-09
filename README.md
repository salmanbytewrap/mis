# MIS  Reporting

### How to Run

1. Clone this project.
2. Perform `npm install` to install the depedencies.
3. Update your own env vars`in`.env.dist` file
4. Rename `.env.sample` to `.env`.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `dist` folder.<br />

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `start redis server`

command: redis-server
### `npm start`

Runs the app in the production mode.<br />

### To deploy this project on aws ec2 

```bash
Install NodeJS and NPM using nvm
Install Pm2 and nginx
 -  pm2 init simple
 - This will generate a sample ecosystem.config.js:
 - add following lines in ecosystem file
Install Git and clone repository from GitHub
Install dependencies
Run the application using Pm2
Configure security group to access via public URL
Access the application in browser
```

# Acting on PM2 Configuration File
### pm2 sample file
module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js" // build Path your dist/app.js
  }]
}
# Start all applications
pm2 start ecosystem.config.js

# Stop all
pm2 stop ecosystem.config.js

# Restart all
pm2 restart ecosystem.config.js

# Reload all
pm2 reload ecosystem.config.js

# Delete all
pm2 delete ecosystem.config.js
## Architecture
```
├── app.ts
├── components
│   └── Mis
│       ├── MisController.ts
│       ├── MisInterface.ts
│       ├── MisModel.ts
│       ├── MisRouter.ts
│       └── MisValidator.ts
├── config
│   └── Config.ts
├── helpers
│   ├── DB
│   │   └── DbHelper.ts
│   ├── JwtHelper.ts
│   ├── redis
│   │   └── index.ts
│   └── validateJsonHelper.ts
├── routers
│   └── index.ts
└── utils
    ├── ResponseClass.ts
    └── utility.ts
```

## Authentication
Use Basic auth 
credentials:

email: salman@gmail.com

password:  salman@123
            
 Auth Key in Heade : idToken        


 ## DB table
 CREATE TABLE `users` (
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;   